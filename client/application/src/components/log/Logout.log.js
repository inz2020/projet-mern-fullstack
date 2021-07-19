import React from 'react';
import cookie from 'js-cookie';
import axios from 'axios';

const Logout = () => {
      // On retire(on se deconnecte aussi  en front) le cookie en front 
    const removeCookie=(key)=>{
        if(window!=="undefined"){
            cookie.remove(key, {expires:1});
        }
    }
    // On se deconnecte avec le server en backend
    const logout= async()=>{
        await axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}api/users/logout`,
            withCredentials:true,

        })
        .then(
              // On se deconnecte avec  en front
            ()=>removeCookie('jwt'))
        .catch((err)=>console.log(err))
        
        //Etre redirigé à la page d'acceuil
        window.location="/";
    };
    return (
        <div>
            <li onClick={logout}>
            <img src="./images/icons/logout.svg" alt="logout"/>
            </li>
        </div>
    );
};

export default Logout;