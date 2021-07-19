import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteComment, editComment } from '../../actions/Post.action'
import { UidContext } from '../AppContext'

const CommentEditDelete = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false)
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState(false)
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const handleEdit = (e) => {
    e.preventDefault()
    if (text) {
      dispatch(editComment(postId, comment._id, text))

      setText('')
      setEdit(false)
    }
  }

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id))
  }

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commentId) setIsAuthor(true)
    }
    checkAuthor()
  }, [uid, comment.commentId])

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./images/icons/edit.svg" alt="edit-comment" />
        </span>
      )}

      {isAuthor && edit && (
        <form className="edit-comment-form" action="" onSubmit={handleEdit}>
          <label htmlFor="edit-comment" onClick={() => setEdit(!edit)}>
            Editez
          </label>
          <br />
          <input
            type="text"
            defaultValue={comment.text}
            name="edit-comment"
            onChange={(e) => setText(e.target.value)}
          />
          <br />

          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm('Voulez-vous supprimer ce commentaire??')) {
                  handleDelete()
                }
              }}
            >
              <img src="./images/icons/trash.svg" alt="edit-comment" />
            </span>

            <input type="submit" value="Mettre à jour" />
          </div>
        </form>
      )}
    </div>
  )
}

export default CommentEditDelete
