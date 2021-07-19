import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../Utils'
import FollowHandler from './FollowHandler'

const FriendsHint = () => {
  const userData = useSelector((state) => state.userReducer)
  const usersData = useSelector((state) => state.usersReducer)

  const [isLoading, setIsLoading] = useState(true)
  const [playOnce, setPlayOnce] = useState(true)
  //Tableau pour stocker tous les suggestions d'amis
  const [friendsHint, setFriendsHint] = useState([])

  useEffect(() => {
    //Fonction determinant tous les users avec lesquels on n'est pas amis
    const notFriendList = () => {
      let list = []
      usersData.map((user) => {
        //   Condition pour que le user n s'ajoute pas lui-meme et qu'il ne soit pas parmis les followers aussi
        if (user._id !== userData._id && !user.followers.includes(userData._id))
          return list.push(user._id)

        return null
      })
      list.sort(() => 0.5 - Math.random())
      if (window.innerHeight > 780) {
        list.length = 5
      } else if (window.innerHeight > 720) {
        list.length = 4
      } else if (window.innerHeight > 615) {
        list.length = 3
      } else if (window.innerHeight > 540) {
        list.length = 1
      } else {
        list.length = 0
      }

      setFriendsHint(list)
      // console.log('liste', list)
    }
    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList()
      setIsLoading(false)
      setPlayOnce(false)
    }
    notFriendList()
  }, [usersData, userData, playOnce])
  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>
      {isLoading ? (
        <div className="icon">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {friendsHint &&
            friendsHint.map((user) => {
              for (let i = 0; i < usersData.length; i++) {
                if (user === usersData[i]._id) {
                  return (
                    <li className="user-hint" key={user}>
                      <img src={usersData[i].image} alt="user-pic" />
                      <p>{usersData[i].pseudo}</p>
                      <FollowHandler
                        idToFollow={usersData[i]._id}
                        type={'suggestion'}
                      />
                    </li>
                  )
                }
              }
              return null
            })}
        </ul>
      )}
    </div>
  )
}

export default FriendsHint
