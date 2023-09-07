import "./Profile.css";

import {uploads} from "../../utils/config";

import Message from "../../components/Message/Message";
import { Link } from "react-router-dom";
import {BsFillEyeFill, BsPencilFill, BsXLg} from "react-icons/bs";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {getUserDetails} from "../../slices/userSlice";
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto} from "../../slices/photoSlice";

const Profile = () => {
    const {id} = useParams();

    const dispatch = useDispatch();

    const {user, loading}= useSelector((state) => state.user);
    const {user: userAuth}= useSelector((state) => state.auth);
    const {photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto} = useSelector(state => state.photo);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

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
        }, 1500);
    };

    const handleDelete = (id) => {
        dispatch(deletePhoto(id));
        setTimeout(() => {
            dispatch(resetMessage());
        }, 1500);
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
                                <input type="file" onChange={handleFile}/>
                            </label>

                            {!loadingPhoto && <input type="submit" value={"Postar"} />}
                            {loadingPhoto && <input type="submit" value={"Aguarde..."} disabled />}
                        </form>
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
                                    <Link to={`/photos${photo.image}`}><BsFillEyeFill /></Link>
                                    <BsPencilFill />
                                    <BsXLg onClick={() => handleDelete(photo.id)}/>
                                </div>
                            ) : ( 
                                <Link to={`/photos${photo.image}`} className="btn">Ver</Link>
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