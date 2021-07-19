import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePost } from '../../actions/Post.action'
import LikeButton from './LikeButton.posts'
import FollowHandler from '../profil/FollowHandler'
import { dataParser, isEmpty } from '../Utils'
import DeleteCard from './DeleteCard.posts'
import CommentCard from './CommentCard.posts'

const Card = ({ post }) => {
  //Tant qu'on n'a pas la data, on met un petit truc de chargement pour faire patienter l'user

  const [isLoading, setIsLoadding] = useState(true)

  const usersData = useSelector((state) => state.usersReducer)
  const userData = useSelector((state) => state.userReducer)

  const [isUpdated, setIsUpdated] = useState(false)
  const [textUpdate, setTextUpdate] = useState(null)
  const [showComments, setShowComments] = useState(false)
  const dispatch = useDispatch()
  //Fonction pour mettre à jour le message du post(textarea) en cliquant sur le boutton valider
  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate))
    }
    setIsUpdated(false)
  }

  //On eleve le chargement quand on monte le composant
  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoadding(false)
  }, [usersData])

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.postId) return user.image
                    else return null
                  })
                  .join('')
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user._id === post.postId) return user.pseudo
                      else return null
                    })}
                </h3>
                {/* //Eviter que le user soit ali avec lui meme */}
                {post.postId !== userData._id && (
                  <FollowHandler idToFollow={post._id} type={'card'} />
                )}
              </div>
              <span>{dataParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />

                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Mettre à jour
                  </button>
                </div>
              </div>
            )}

            {post.image && (
              <img className="card-pic" src={post.image} alt="card-pic" />
            )}

            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                title={post._id}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            )}

            {/* On ne peut modifier un post que si on est l'auteur */}
            {userData._id === post.postId && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./images/icons/edit.svg" alt="edit-message-post" />
                </div>
                {/* icon de suppression */}
                <DeleteCard id={post._id} />
              </div>
            )}

            {/* Le bas du card est composé de 3 icons: comments, likes et share */}
            <div className="card-footer">
              {/* icon de commentaires */}
              <div className="comment-icon">
                <img
                  src="./images/icons/message1.svg"
                  alt="comment"
                  onClick={() => setShowComments(!showComments)}
                />
                <span>{post.comments.length}</span>
              </div>

              <LikeButton post={post} />
              <img src="./images/icons/share.svg" alt="share" />
            </div>
            {showComments && <CommentCard post={post} />}
          </div>
        </>
      )}
    </li>
  )
}

export default Card
