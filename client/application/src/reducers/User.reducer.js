import { FOLLOW_USER, GET_USER, UPLOAD_IMAGE } from '../actions/User.action';
import { UPDATE_BIO, UNFOLLOW_USER } from './../actions/User.action';
const initialState = {

}

export default function userReducer(
    state = initialState,
    action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPLOAD_IMAGE:
            return {...state,
                image: action.payload
            };

        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload
            }
        case FOLLOW_USER:
            return {
                ...state,
                following: [action.payload.idToFollow, ...state.following]
            }

        case UNFOLLOW_USER:
            return {
                ...state,
                // cette fois on retire du tableau id 
                following: state.following.filter((id) => id !== action.payload.idToUnFollow)
            }
        default:
            return state;
    }

}