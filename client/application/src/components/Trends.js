import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getTrends } from '../actions/Post.action'
import allPostsReducer from './../reducers/AllPosts.reducer'
import userReducer from './../reducers/User.reducer'
import { isEmpty } from './Utils'
import trendReducer from './../reducers/Trend.reducer'

const Trends = () => {
  const posts = useSelector((state) => state.allPostsReducer)
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const trendList = useSelector((state) => state.trendReducer)
  useEffect(() => {
    if (!isEmpty(posts[0])) {
      //Trier par ordre de likes(du plus liké au moins liké)
      const postArray = Object.keys(posts).map((i) => posts[i])
      let sortedArray = postArray.sort((a, b) => {
        return b.likers.length - a.likers.length
      })

      sortedArray.length = 3
      console.log('sortedArray', sortedArray)
      dispatch(getTrends(sortedArray))
    }
  }, [posts, dispatch])

  return (
    <div className="trending-container">
      <h4>Trending</h4>
      <NavLink exact to="/trending">
        <ul>
          {trendList.length &&
            trendList.map((post) => {
              return (
                <li key={post._id}>
                  <div>
                    {post.image && <img src={post.image} alt="post-pic" />}

                    {post.video && (
                      <iframe
                        allowFullScreen
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write;
                            encrypted-media; gyroscope; picture-in-picture"
                        src={post.video}
                        title={post._id}
                      ></iframe>
                    )}

                    {isEmpty(post.image) && isEmpty(post.video) && (
                      <img
                        src={
                          userData[0] &&
                          userData
                            .map((user) => {
                              if (user._id === post.postId) {
                                return user.image
                              } else return null
                            })
                            .join('')
                        }
                        alt="profil-pic"
                      />
                    )}
                  </div>
                  <div className="trend-content">
                    <p>{post.message}</p>
                    <span>Lire</span>
                  </div>
                </li>
              )
            })}
        </ul>
      </NavLink>
    </div>
  )
}

export default Trends
