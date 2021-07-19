import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './styles/index.scss'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/Index.reducer'

//devtools
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import { getUsers } from './actions/User.action'
import { getPosts } from './actions/Post.action'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger)),
)

store.dispatch(getUsers())
store.dispatch(getPosts())
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root'),
)
