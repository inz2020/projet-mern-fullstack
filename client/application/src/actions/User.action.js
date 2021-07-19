import axios from 'axios';

//Les actions
export const GET_USER = "GET_USER";
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER ";
export const UNFOLLOW_USER = "UNFOLLOW_USER ";
export const GET_USERS = "GET_USERS";
export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (uid) => {
    // le dispatch est ce qu'on va envoyer au reducer
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/users/${uid}`)
            .then(
                (res) => {
                    dispatch({ type: GET_USER, payload: res.data });
                }
            )
            .catch((err) => console.log(err))
    }
}

export const uploadImage = (data, id) => {
    return (dispatch) => {
        ///On envoie à la BD les données
        return axios
            //La data passée est ce qui correspond à la data  dans le composant UploadImage.profil(name, userid, file) 
            .post(`${process.env.REACT_APP_API_URL}api/users/upload`, data)
            .then(
                (res) => {
                    if (res.data.errors) {
                        dispatch({ type: GET_USER_ERRORS, payload: res.data.errors })
                    } else {
                        //Si c'est sans erreur, on indique à notre store de ne rien faire
                        dispatch({ type: GET_USER_ERRORS, payload: '' })

                        return axios
                            .get(`${process.env.REACT_APP_API_URL}api/users/${id}`)
                            .then(
                                (res) => dispatch({ type: UPLOAD_IMAGE, payload: res.data.image }))
                    }
                })
            .catch((err) => console.log(err))

    }
}

export const updateBio = (userId, bio) => {

    return (dispatch) => {
        return axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/users/` + userId,
                data: { bio }
            })
            .then(
                (res) => {
                    dispatch({ type: UPDATE_BIO, payload: bio })
                })
            .catch((err) => console.log(err))
    }

}


export const getUsers = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/users`)
            .then(
                (res) => { dispatch({ type: GET_USERS, payload: res.data }) }
            )
            .catch((err) => console.log(err))
    }
}

//Execution de l'action follow dans la BD
export const followUser = (followerId, idToFollow) => {
    return (dispatch) => {
        return axios({
                method: "patch",
                url: `${process.env.REACT_APP_API_URL}api/users/follow/` + followerId,
                data: { idToFollow }
            })
            .then(
                (res) => dispatch({ type: FOLLOW_USER, payload: { idToFollow } })
            )
            .catch((err) => console.log(err))
    }
}


//Execution de l'action unfollow dans la BD
export const UnFollowUser = (unFollowerId, idToUnFollow) => {
    return (dispatch) => {
        return axios({
                method: "patch",
                url: `${process.env.REACT_APP_API_URL}api/users/unfollow/` + unFollowerId,
                data: { idToUnFollow }
            })
            .then(
                (res) => dispatch({ type: UNFOLLOW_USER, payload: { idToUnFollow } })
            )
            .catch((err) => console.log(err))
    }
}