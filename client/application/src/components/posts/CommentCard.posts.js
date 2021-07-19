import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty } from '../Utils'
import FollowHandler from '../profil/FollowHandler'
import { timestampParser } from './../Utils'
import { addComment } from '../../actions/Post.action'
import { getPosts } from './../../actions/Post.action'
import CommentEditDelete from './CommentEditDelete.posts'

const CommentCard = ({ post }) => {
  const userData = useSelector((state) => state.userReducer)
  const usersData = useSelector((state) => state.usersReducer)
  const dispatch = useDispatch()

  const [text, setText] = useState('')

  const handleComments = (e) => {
    e.preventDefault()
    if (text) {
      dispatch(addComment(post._id, userData._id, userData.pseudo, text))
        .then(() => dispatch(getPosts()))
        // Remettre le text apres avoir fait un premier commentaire
        .then(() => setText(''))
    }
  }

  return (
    <div className="comments-container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commentId === userData._id
                ? 'comment-container client'
                : 'comment-container'
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.commentId) return user.image
                      else return null
                    })
                    .join('')
                }
                alt="comment-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.commentPseudo}</h3>
                  {comment.commentId !== userData.commentId && (
                    <FollowHandler
                      idToFollow={comment.commentId}
                      type={'card'}
                    />
                  )}
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <CommentEditDelete comment={comment} postId={post._id} />
            </div>
          </div>
        )
      })}
      {/* On ne presente le formulaire qu'à ceux qui sont connectés */}
      {userData._id && (
        <form className="comment-form" action="" onSubmit={handleComments}>
          <input
            type="text"
            name="text"
            value={text}
            placeholder="Laisser un commentaire"
            onChange={(e) => setText(e.target.value)}
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  )
}

export default CommentCard
