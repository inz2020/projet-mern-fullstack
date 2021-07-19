import { GET_TRENDS } from '../actions/Post.action'

const initialState = {}

export default function trendReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRENDS:
      return action.payload

    default:
      return state
  }
}
