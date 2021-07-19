import { GET_USERS } from "../actions/User.action";

const initialState = {}

export default function usersReducer(
    state = initialState, action
) {
    switch (action.type) {
        case GET_USERS:
            return action.payload;

        default:
            return state;
    }
}