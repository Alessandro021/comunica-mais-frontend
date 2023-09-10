import "./Home.css";

import LikeContainer from "../../components/LikeContainer/LikeContainer";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import {useResetComponentMessage} from "../../hooks/useResetComponentMessage";

import { getPhotos, like, comment } from "../../slices/photoSlice";

const Home = () => {

    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);

    const {user} = useSelector(state => state.auth);
    const {photos, loading} = useSelector(state => state.photo);

    useEffect(() => {
        dispatch(getPhotos());
    },[dispatch]);

    const handleLike = (photo) => {
        dispatch(like(photo.id));

        resetMessage();
    };
    if(loading){
        return <p>Carregando...</p>;
    }
    return (
        <div id="home">
            {photos?.map(photo => (
                <div key={photo.id}>
                    <PhotoItem photo={photo} />
                    <LikeContainer photo={photo} user={user} handleLike={handleLike} />
                    <Link className="btn" to={`/photos/${photo.id}`} >Ver mais</Link>
                </div>
            ))}
            {photos?.length === 0  && (
                <div>
                    <h2 className="no-photos">Ainda não há fotos publicadas, <Link to={`/users/${user._id}`}>clique aqui</Link></h2>
                </div>
            )}
        </div>
    );
};

export default Home;