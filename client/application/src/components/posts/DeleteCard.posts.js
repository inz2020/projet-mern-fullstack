import React from 'react'
import { useDispatch } from 'react-redux'

import { deletePost } from '../../actions/Post.action'

const DeleteCard = (props) => {
  const dispatch = useDispatch()

  const deleQuote = () => {
    dispatch(deletePost(props.id))
  }
  return (
    <div
      onClick={() => {
        if (window.confirm('Voulez-vous supprimer cet article?')) {
          deleQuote()
        }
      }}
    >
      <img src="./images/icons/trash.svg" alt="trash" />
    </div>
  )
}

export default DeleteCard
