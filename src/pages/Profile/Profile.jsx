import "./Profile.css";

import {uploads} from "../../utils/config";

import Message from "../../components/Message/Message";
import { Link } from "react-router-dom";
import {BsFillEyeFill, BsPencilFill, BsXLg} from "react-icons/bs";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {getUserDetails} from "../../slices/userSlice";
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto, updatePhoto} from "../../slices/photoSlice";

const Profile = () => {
    const {id} = useParams();
    
    const dispatch = useDispatch();

    const {user, loading}= useSelector((state) => state.user);
    const {user: userAuth}= useSelector((state) => state.auth);
    const {photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto} = useSelector(state => state.photo);

    // console.log(userAuth);
    // console.log(id);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    const [editId, seteditId] = useState("");
    const [editImage, setEditImage] = useState("");
    const [editTitle, setEditTitle] = useState("");

    const newPhotoForm = useRef();
    const editPhotoForm = useRef();

    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
    },[dispatch, id]);

    const handleFile = (e) => {
        const image = e.target.files[0];

        setImage(image);
    };

    const submitHandle = (e) => {
        e.preventDefault();

        const photoData = {
            title: title,
            image: image
        };

        const formData = new FormData();
        Object.keys(photoData).forEach(key => formData.append(key, photoData[key]));

        // formData.append("photo", photoFormData);

        dispatch(publishPhoto(formData));

        setTitle("");
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    };

    const handleDelete = (id) => {
        dispatch(deletePhoto(id));
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    };

    const hideOrShowForms = () => {
        newPhotoForm.current.classList.toggle("hide");
        editPhotoForm.current.classList.toggle("hide");
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const photoData = {
            title: editTitle,
            id: editId,
        };

        dispatch(updatePhoto(photoData));

        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);

    };

    const handleEdit = (photo) => {
        if(editPhotoForm.current.classList.contains("hide")){
            hideOrShowForms();
        }

        seteditId(photo.id);
        setEditTitle(photo.title);
        setEditImage(photo.image);
    };

    const handleCancelEdit = () => {
        hideOrShowForms();
    };


    if(loading){
        return <p>Carregando...</p>;
    }

    return (
        <div id="profile">
            <div className="profile-header">
                {user?.profileImage && (
                    <img src={`${uploads}/users/${user?.profileImage}`} alt={user?.name} />
                )}
            
                <div className="profile-description">
                    <h2>{user?.name}</h2>
                    <p>{user?.bio}</p>
                </div>
            </div>
            {id === userAuth?._id && (
                <>
                    <div className="new-photo" ref={newPhotoForm}>
                        <h3>compartilhe algum momento seu:</h3>
                        <form onSubmit={submitHandle}>
                            <label>
                                <span>Titulo para a foto:</span>
                                <input type="text" placeholder="Insira um titulo" value={title || ""} onChange={e => setTitle(e.target.value)}/>
                            </label> 

                            <label>
                                <span>Imagem:</span>
                                <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFile}/>
                            </label>

                            {!loadingPhoto && <input type="submit" value={"Postar"} />}
                            {loadingPhoto && <input type="submit" value={"Aguarde..."} disabled />}
                        </form>
                    </div>

                    <div className="edit-photo hide" ref={editPhotoForm}>
                        <p>Editando</p>

                        {editImage && (
                            <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
                        )}

                        <form onSubmit={handleUpdate}>
                            <label>
                                <span>Titulo para a foto:</span>
                                <input type="text" placeholder="Insira um titulo" value={editTitle || ""} onChange={e => setEditTitle(e.target.value)}/>
                            </label> 

                            <input type="submit" value={"Atualizar"} />
                            {/* <button className="cancel-btn" onClick={handleCancelEdit}>Cancelar edição</button> */}

                        </form>
                        <button className="cancel cancel-btn" onClick={handleCancelEdit}>Cancelar edição</button>
                    </div>

                    {errorPhoto &&  <Message msg={Object.values(errorPhoto)} type="error"/>}
                    {messagePhoto && <Message msg={messagePhoto} type={"success"} />}
                </>
            )}

            <div className="user-photos">
                <h2>Fotos publicadas</h2>
                <div className="photos-container">
                    {photos && photos.map(photo => (
                        <div key={photo.id} className="photo">
                            {photo.image && (
                                <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
                            )}

                            {id === userAuth._id ? (
                                <div className="actions">
                                    <Link to={`/photos/${photo.id}`}><BsFillEyeFill /></Link>
                                    <BsPencilFill onClick={() => handleEdit(photo)}/>
                                    <BsXLg onClick={() => handleDelete(photo.id)}/>
                                </div>
                            ) : ( 
                                <Link to={`/photos/${photo.id}`} className="btn">Ver</Link>
                            )}
                        </div>
                    ))}

                    {photos.length === 0 && (
                        <p>Ainda não há fotos publicadas.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;