import React, { useContext } from 'react'
import LeftNav from '../components/LeftNav'
import NewPostForm from '../components/posts/NewPostForm.posts'
import FriendsHint from '../components/profil/FriendsHint.profil'
import Thread from '../components/Thread'
import Trends from '../components/Trends'
import { UidContext } from './../components/AppContext'
import Log from './../components/log/Index.log'

const Home = () => {
  const uid = useContext(UidContext)
  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">
          {/* Si on a le uid, on invite lutilisateur à utiliser le formulaire
                    (le composant NewPostForm) sinon il va se connecter */}
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
            {uid && <FriendsHint />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
