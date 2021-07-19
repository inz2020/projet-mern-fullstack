import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';
import Popup from 'reactjs-popup';
import { useDispatch } from 'react-redux';
import { likePost, unLikePost } from '../../actions/Post.action';

const LikeButton = ({post}) => {

    //Verifier si le post est liké ou pas
    const [liked, setLiked]= useState(false);
    const uid= useContext(UidContext)
    const dispatch= useDispatch();

    const like=()=>{
        dispatch(likePost(uid, post._id))
        setLiked(true)
    }

    const unLike=()=>{
        dispatch(unLikePost(uid, post._id))
        setLiked(false)

    }

    useEffect(
        ()=>{
            if(post.likers.includes(uid)) setLiked(true)
            else setLiked(false)

        }
    ,[uid, post.likers, liked])
    return (
        <div className="like-container">
            {/* supposons que le user n'est pas connecté */}
            {uid===null && (
                <Popup 
                trigger={<img src="./images/icons/heart.svg" alt="like" />}
                position={['bottom center', 'bottom left','bottom right']}
                closeOnDocumentClick>
                    <div>Connectez-vous pour pouvoir liker ce post!!</div>
                </Popup>
            )}

            {/* Le cas où le user est connecté */}
            {uid && liked===false && (
                <img src="./images/icons/heart.svg" alt="like" 
                onClick={like}/>
            )}

            {uid && liked && (
                <img src="./images/icons/heart-filled.svg" alt="unlike" 
                onClick={unLike}/>
            )}
            <span>{post.likers.length}</span>
            
            
        </div>
    );
};

export default LikeButton;