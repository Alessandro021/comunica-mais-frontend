import "./Photo.css";

import { uploads } from "../../utils/config";

import Message from "../../components/Message/Message";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


import { getPhoto, like } from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import LikeContainer from "../../components/LikeContainer/LikeContainer";

const Photo = () => {

    const {id} = useParams();

    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth);
    const {photo, loading, error, message} = useSelector(state => state.photo);

    useEffect(() => {
        dispatch(getPhoto(id));
    },[id, dispatch]);

    // console.log(photo);

    const handleLike = () => {
        dispatch(like(photo.id));
    };

    if(loading) {
        return <p>Carregando...</p>;
    }
    return (
        <div id="photo">
            <PhotoItem photo={photo} />
            <LikeContainer user={user} photo={photo} handleLike={handleLike} />
            div
        </div>
    );
};

export default Photo;