import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { UidContext } from './../components/AppContext'
import LeftNav from './../components/LeftNav'
import { isEmpty } from '../components/Utils'
import Card from '../components/posts/Card.posts'
import Trends from '../components/Trends'
import FriendsHint from '../components/profil/FriendsHint.profil'

const Trending = () => {
  //Verifier que le user est bien connecté
  const uid = useContext(UidContext)
  const trendList = useSelector((state) => state.trendReducer)
  return (
    <div className="trending-page">
      <LeftNav />
      <div className="main">
        <ul>
          {!isEmpty(trendList[0]) &&
            trendList.map((post) => <Card post={post} key={post._id} />)}
        </ul>
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <Trends />
          {uid && <FriendsHint />}
        </div>
      </div>
    </div>
  )
}

export default Trending
