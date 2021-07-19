import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty, timestampParser } from '../Utils'
import { NavLink } from 'react-router-dom'
import { addPost, getPosts } from './../../actions/Post.action'

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  //c'est l'image passée en front
  const [postImage, setPostImage] = useState(null)
  const [video, setVideo] = useState('')
  //c'est le fichier qu'on passe à la BD
  const [file, setFile] = useState()
  const userData = useSelector((state) => state.userReducer)
  const error = useSelector((state) => state.errorReducer.postError)

  const dispatch = useDispatch()
  const handleImage = (e) => {
    //Previsualisation immédiate de l'image à passer en front
    setPostImage(URL.createObjectURL(e.target.files[0]))

    //Si confirmé, l'nvoyer à la BD
    setFile(e.target.files[0])
    //Donc, on ne peut plus envoyer une video
    setVideo('')
  }

  const handlePost = async () => {
    if (message || postImage || video) {
      const data = new FormData()
      data.append('postId', userData._id)
      data.append('message', message)
      if (file) data.append('file', file)
      data.append('video', video)

      //envoyer au back
      await dispatch(addPost(data))

      //On redemmande à la BD de nous retourner les posts (getPosts) car cest la BD mongoose qui genere les id automa. Et donc on les connait pas d'avance
      dispatch(getPosts())
      //Après on reedemande de mettre tout à zero
      cancelPost()
    } else {
      alert('Veuillez entrer un message!!')
    }
  }
  const cancelPost = () => {
    setMessage('')
    setVideo('')
    setPostImage('')
    setFile('')
  }

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false)
    //Verification d'un lien youtube
    const handleVideo = () => {
      //sciender le message passé dans le champ  à chaque espacement
      let findLink = message.split(' ')
      console.log(findLink)
      //Une boucle pour traiter chaque élément de la variable message
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes('https://www.yout') ||
          findLink[i].includes('https://yout')
        ) {
          let embed = findLink[i].replace('watch?v=', 'embed/')
          setVideo(embed.split('&')[0])
          //On enleve le lien de la video dans le champ message une fois qu'on l'a entré
          findLink.splice(i, 1)
          setMessage(findLink.join(' '))

          //Si jamais on a photo, on l'enleve car on ne peut pas avoir une video et une image en meme temps
          setPostImage('')
        }
      }
    }

    handleVideo()
  }, [userData, message, video])
  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>{userData.following ? userData.following.length : 0}</span>
              {''} Abonnement
              {/* on ajoutera le "s" à abonnement que qaund son nbre est supérieur à 1 */}
              {userData.following && userData.following.length > 1 ? 's' : null}
            </p>

            <p>
              <span>{userData.followers ? userData.followers.length : 0} </span>
              {''} Abonné
              {userData.followers && userData.followers.length > 1 ? 's' : null}
            </p>
          </div>

          {/* Photo de profil à afficher */}
          <NavLink exact to="/profil">
            <div className="user-info">
              <img src={userData.image} alt="user-imag" />
            </div>
          </NavLink>

          {/* Si une des 3 conditions reunies, on peut  afficher le rendu */}
          {message || postImage || video.length > 20 ? (
            <li className="card-container">
              <div className="card-left">
                <img src={userData.image} alt="user-imag" />
              </div>
              <div className="card-right">
                <div className="card-header">
                  <div className="pseudo">
                    <h3>{userData.pseudo}</h3>
                  </div>
                  {/* Ajouter la date (en direct) du post */}
                  <span>{timestampParser(Date.now())}</span>
                </div>
                {/* Afficher le message */}
                <div className="content">
                  <p>{message}</p>
                  <img src={postImage} alt="" />
                  {video && (
                    <iframe
                      src={video}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture "
                      allowFullScreen
                      frameBorder="0"
                      title={video}
                    ></iframe>
                  )}
                </div>
              </div>
            </li>
          ) : null}

          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                    <img src="./images/icons/picture.svg" alt="imag" />
                    <input
                      type="file"
                      id="file-updload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handleImage(e)}
                    />
                  </>
                )}

                {/* Uploading le video */}
                {video && (
                  <button onClick={() => setVideo('')}>
                    Supprimer la video
                  </button>
                )}
              </div>
              {!isEmpty(error.format) && <p>{error.format}</p>}
              {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
              <div className="btn-send">
                {/* Tu t'affiches que quand il y'a de la matière(soit un message, une image ou une video) */}
                {message || postImage || video.length > 20 ? (
                  /* Si ces condiions sont remplies,on propose un button annuler */
                  <button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default NewPostForm
