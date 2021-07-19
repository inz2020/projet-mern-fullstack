import React, { useState } from 'react'
import LeftNav from '../LeftNav'
import { useSelector } from 'react-redux'
import UploadImage from './UploadImage.profil'
import { useDispatch } from 'react-redux'
import { updateBio } from '../../actions/User.action'
import { dataParser } from '../Utils'
import FollowHandler from './FollowHandler'

const UpdateProfil = () => {
  const [bio, setBio] = useState('')
  const [updateForm, setUpdateForm] = useState(false)
  //Recuperer la data stockée dans le store
  const userData = useSelector((state) => state.userReducer)
  const usersData = useSelector((state) => state.usersReducer)
  const error = useSelector((state) => state.errorReducer.userError)
  const dispatch = useDispatch()

  const [followingPopup, setFollowingPopup] = useState(false)
  const [followersPopup, setFollowersPopup] = useState(false)
  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio))
    setUpdateForm(false)
  }
  return (
    <div className="profil-container">
      <LeftNav />
      <h1> Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.image} alt="user-img" />
          {/* Gerer la logique de l'image à telecharger */}
          <UploadImage />
          <p>{error.format}</p>
          <p>{error.maxSize}</p>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {/* Le cas ou updateForm ets à true */}
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>

                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio
                </button>
              </>
            )}

            {/* Le cas ou updateForm ets à true */}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider</button>
              </>
            )}
          </div>
          <h4>Membre depuis le {dataParser(userData.createdAt)}</h4>
          <h5 onClick={() => setFollowingPopup(true)}>
            Abonnements: {userData.following ? userData.following.length : '0'}
          </h5>

          <h5 onClick={() => setFollowersPopup(true)}>
            Abonnés: {userData.followers ? userData.followers.length : '0'}
          </h5>
        </div>
      </div>

      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>

            {/* Lister les abonnements avec leur data */}

            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.following.length; i++)
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.image} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={'suggestion'}
                          />
                        </div>
                      </li>
                    )
                  }
                return null
              })}
            </ul>
          </div>
        </div>
      )}

      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>

            {/* Lister les abonnés avec leur data */}

            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.followers.length; i++)
                  if (user._id === userData.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.image} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={'suggestion'}
                          />
                        </div>
                      </li>
                    )
                  }
                return null
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateProfil
