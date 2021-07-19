import { combineReducers } from 'redux';
import userReducer from './User.reducer';
import usersReducer from './Users.reducer';
import postReducer from './Post.reducer';
import errorReducer from './Error.reducer';
import allPostsReducer from './AllPosts.reducer';
import trendReducer from './Trend.reducer';

export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    errorReducer,
    allPostsReducer,
    trendReducer

});