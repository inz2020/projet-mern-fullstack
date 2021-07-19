import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, UnFollowUser } from '../../actions/User.action'
import { isEmpty } from '../Utils'

const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.userReducer)

  //on voudra que une fois l user clique sur le button "suivre" que ce button devient suivi
  //Par defaut l boutton est à suivre, d'où le false. Et donc à true, on a suivi
  const [isFollowed, setIsfollowed] = useState(false)

  const dispatch = useDispatch()

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow))
    setIsfollowed(true)
  }

  const handleUnFollow = () => {
    dispatch(UnFollowUser(userData._id, idToFollow))
    setIsfollowed(false)
  }

  //A chaque fois que le composant (popup) est monté, on voudra bien que quand la data evolue
  // qu'on relance le useEffect et cela quand tu as le idToFollow

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsfollowed(true)
      } else setIsfollowed(false)
    }
  }, [userData, idToFollow])

  return (
    <div>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={() => handleUnFollow()}>
          {type === 'suggestion' && (
            <button className="unfollow-btn">Abonné</button>
          )}
          {type === 'card' && (
            <img src="./images/icons/checked.svg" alt="checked" />
          )}
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={() => handleFollow()}>
          {type === 'suggestion' && (
            <button className="follow-btn">Suivre</button>
          )}
          {type === 'card' && (
            <img src="./images/icons/check.svg" alt="check" />
          )}
        </span>
      )}
    </div>
  )
}

export default FollowHandler
