import "./EditProfile.css";
// import { FiUpload} from "react-icons/fi";

import { uploads } from "../../utils/config";

import { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";

import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

import Message from "../../components/Message/Message";

const EditProfile = () => {
    const dispatch = useDispatch();

    const {user, message, error, loading } = useSelector(state => state.user);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [bio, setBio] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        dispatch(profile());
    },[dispatch]);

    useEffect(() => {
        if(user && error === null){
            setName(user.name);
            setEmail(user.email);
            {user.bio !== "null" && setBio(user.bio);}
        }
    },[user]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const userData = {
            name: name
        };

        if(profileImage){
            userData.profileImage = profileImage;
        }

        if(bio){
            userData.bio = bio;
        }

        if(password){
            userData.password = password;
        }

        const formData = new FormData();

        Object.keys(userData).forEach(key =>  formData.append(key, userData[key]));

        // formData.append("user", userFormData);

        await dispatch(updateProfile(formData));

        setTimeout(() => {
            dispatch(resetMessage());
        }, 1500);
    };

    const handleFile = (e) => {
        const image = e.target.files[0];

        setPreviewImage(image);

        setProfileImage(image);
    };
    return(
        <div id="edit-profile">
            <h2>Edite seus dados</h2>
            <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
            
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input type="text" placeholder="Nome" value={name || ""} onChange={e => setName(e.target.value)} />
                </label>

                <label>
                    <span>Email:</span>
                    <input type="email" placeholder="E-mail" disabled value={email || ""}/>
                </label>
                <label className="labelAvatar">
                    <span>Imagem de perfil:</span>
                    <span style={{textAlign: "center"}}>Clique e escolha a sua imagem</span>
                    <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/>
                    {(user?.profileImage || previewImage) && (
                        <img className="profile-image" 
                            src={previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user?.profileImage}`}
                            alt={user?.name}
                            width={150}
                            height={150}
                        />
                    )}
                </label>
                <label>
                    <span>Bio:</span>
                    <input type="text" placeholder="Descrição do perfil" value={bio || ""} onChange={e => setBio(e.target.value)}/>
                </label>
                <label>
                    <span>Quer alterar sua senha?</span>
                    <input type="password" placeholder="Digite sua nova senha" value={password || ""} onChange={e => setPassword(e.target.value)}/>
                </label>
                {!loading && <input type="submit" value={"Atualizar"}/>}
                {loading && <input type="submit" value={"Aguarde..."} disabled/>}
                {error && Object.values(error).map(err => <Message key={err} msg={err} type="error"/>)}
                {message && <Message msg={message} type="success"/>}
            </form>
        </div>
    );
};

export default EditProfile;