import "./LikeContainer.css";

import {BsHeart, BsHeartFill} from "react-icons/bs";


const LikeContainer = ({photo, user, handleLike}) => {
    return(
        <div className="like">
            {photo.likes && user && (
                <>
                    {photo?.likes.includes(user._id) ? (
                        <BsHeartFill onClick={() => handleLike(photo)} />
                    ) : (
                        <BsHeart onClick={() => handleLike(photo)} />
                    )}
                    <p>{photo.likes.length} likes(s)</p>
                </>
            ) }
        </div>
    );
};

export default LikeContainer;