import "./Photo.css";

import { uploads } from "../../utils/config";

import Message from "../../components/Message/Message";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";


import { getPhoto, like, comment} from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import LikeContainer from "../../components/LikeContainer/LikeContainer";

const Photo = () => {

    const {id} = useParams();

    const dispatch = useDispatch();
    const resetMessage = useResetComponentMessage(dispatch);

    const {user} = useSelector(state => state.auth);
    const {photo, loading, error, message} = useSelector(state => state.photo);

    const [commentText, setCommentText] = useState("");
    useEffect(() => {
        dispatch(getPhoto(id));
    },[id, dispatch]);

    // console.log(photo);

    const handleLike = () => {
        dispatch(like(photo.id));

        resetMessage();
    };

    const handleComment = (e) => {
        e.preventDefault();

        const commentData = {
            comment: commentText,
            id: photo.id,
        };

        dispatch(comment(commentData));

        setCommentText("");

        resetMessage();
    };

    if(loading) {
        return <p>Carregando...</p>;
    }
    return (
        <div id="photo">
            <PhotoItem photo={photo} />
            <LikeContainer user={user} photo={photo} handleLike={handleLike} />
            <div className="message-container">
                {error &&  <Message msg={Object.values(error)} type="error"/>}
                {message &&  <Message msg={message} type="success"/>}
            </div>
            <div className="comments">
                <h3>Comentários: ({photo.comments?.length})</h3>
                <form onSubmit={handleComment}>
                    <input type="text" placeholder="Insira o seu comentário" value={commentText || ""} onChange={e => setCommentText(e.target.value)} />
                    <input type="submit" value={"Enviar"} />
                </form>
                {photo.comments?.length === 0 && <p>Não há comentários.</p>}
                {photo.comments?.map(comment => (
                    <div key={comment.id} className="comment">
                        <div className="author">
                            {comment.userImage && (
                                <img src={`${uploads}/users/${comment.userImage}`} alt={comment.userName} />
                            )}
                            <Link to={`/users/${comment.userId}`}><p>{comment.userName}</p></Link>
                        </div>
                        <p>{comment.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Photo;