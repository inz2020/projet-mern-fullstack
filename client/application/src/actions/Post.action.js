import axios from "axios";

//posts
export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST = "ADD_POST";
export const GET_POST_ERRORS = "GET_POST_ERRORS"
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

//comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";


//Trends
export const GET_TRENDS = "GET_TRENDS";

export const getPosts = (nber) => {
    return (dispatch) => {
        return axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/posts/`,

            })
            .then(
                (res) => {
                    //le nbre de posts à afficher (infiniteScroll)
                    const tab = res.data.slice(0, nber)
                    dispatch({ type: GET_POSTS, payload: tab })
                    dispatch({ type: GET_ALL_POSTS, payload: res.data })
                })
            .catch(err => console.log(err))
    }
}

export const addPost = (data) => {
    return (dispatch) => {
        return axios
            .post(
                `${process.env.REACT_APP_API_URL}api/posts/`, data)
            .then((res) => {
                if (res.data.errors) {
                    dispatch({ type: GET_POST_ERRORS, payload: res.data.errors })
                } else {
                    dispatch({ type: GET_POST_ERRORS, payload: '' })
                }
            })

    }
}

export const likePost = (userId, postId) => {
    return (dispatch) => {
        return axios({
                method: 'patch',
                url: `${process.env.REACT_APP_API_URL}api/posts/like-post/` + postId,
                data: { id: userId }
            })
            .then(
                (res) => dispatch({ type: LIKE_POST, payload: { userId, postId } })
            )
            .catch((err) => console.log(err))
    }
}

export const unLikePost = (userId, postId) => {
    return (dispatch) => {
        return axios({
                method: 'patch',
                url: `${process.env.REACT_APP_API_URL}api/posts/unlike-post/` + postId,
                data: { id: userId }
            })
            .then(
                (res) => dispatch({ type: UNLIKE_POST, payload: { userId, postId } })
            )
            .catch((err) => console.log(err))
    }
}

export const updatePost = (postId, message) => {
    return (dispatch) => {
        return axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
                data: { message }
            })
            .then(
                (res) => { dispatch({ type: UPDATE_POST, payload: { postId, message } }) }
            )
            .catch(
                (err) => console.log(err)
            )
    }
}

export const deletePost = (postId) => {
    return (dispatch) => {
        return axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`
            })
            .then(
                (res) => dispatch({ type: DELETE_POST, payload: { postId } })
            )
            .catch((err) => console.log(err))
    }

}

export const addComment = (postId, commentId, commentPseudo, text) => {
    return (dispatch) => {
        return axios({
                method: "patch",
                url: `${process.env.REACT_APP_API_URL}api/posts/comment-post/${postId}`,
                data: { commentId, commentPseudo, text }
            })
            .then(
                (res) => dispatch({ type: ADD_COMMENT, payload: { postId } })
            )
            .catch((err) => console.log(err))
    }

}

export const editComment = (postId, commentId, text) => {
    return (dispatch) => {
        return axios({
                method: "patch",
                url: `${process.env.REACT_APP_API_URL}api/posts/edit-comment-post/${postId}`,
                data: { commentId, text }
            })
            .then(
                (res) => dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } })
            )
            .catch((err) => console.log(err))
    }

}

export const deleteComment = (postId, commentId) => {
    return (dispatch) => {
        return axios({
                method: "patch",
                url: `${process.env.REACT_APP_API_URL}api/posts/delete-comment-post/${postId}`,
                data: { commentId }
            })
            .then(
                (res) => dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } })
            )
            .catch((err) => console.log(err))
    }

}

export const getTrends = (sortedArray) => {
    return (dispatch) => {
        dispatch({ type: GET_TRENDS, payload: sortedArray })
    }

}