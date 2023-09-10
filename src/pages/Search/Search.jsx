import "./Search.css";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { useQuery } from "../../hooks/useQuery";

import LikeContainer from "../../components/LikeContainer/LikeContainer";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { Link } from "react-router-dom";

import { searchPhotos, like, comment } from "../../slices/photoSlice";

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const dispatch = useDispatch();
    const resetMessage = useResetComponentMessage(dispatch);

    const {user} = useSelector(state => state.auth);

    const {photos, loading} = useSelector(state => state.photo);

    useEffect(() => {
        dispatch(searchPhotos(search));
    },[dispatch, search]);

    const handleLike = (photo) => {
        dispatch(like(photo.id));

        resetMessage();
    };
    if(loading){
        return <p>Carregando...</p>;
    }
    return (
        <div id="search">
            <h2>Você esta buscando por: {search}</h2>
            {photos?.map(photo => (
                <div key={photo.id}>
                    <PhotoItem photo={photo} />
                    <LikeContainer photo={photo} user={user} handleLike={handleLike} />
                    <Link className="btn" to={`/photos/${photo.id}`} >Ver mais</Link>
                </div>
            ))}

            {photos?.length === 0  && (
                <div>
                    <h2 className="no-photos">Não foram encontrados resultados para a sua busca.</h2>
                </div>
            )}
        </div>
    );
};

export default Search;