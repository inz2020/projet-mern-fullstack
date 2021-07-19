import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../actions/User.action';


const UploadImage = () => {
  
  const [file, setFile]= useState();
  const dispatch= useDispatch();
  const userData= useSelector(
    (state)=>state.userReducer
  )

    const handleImage = (e) => {
        e.preventDefault();
        // on se passe le pseudo, id du user et le chemin de l'image (comme je l'ai fait en back sur postman)
        const data= new FormData();
        data.append("name", userData.pseudo);
        data.append("userId", userData._id)
        data.append("file", file);


        //Une fois qu'on a passé ces données on declenche une action en utilisant un dispatch

        dispatch(uploadImage(data, userData._id))

    }
    return (
        <form action = ""
        onSubmit = { handleImage }
        className = "upload-pic" >
        
        <label htmlFor = "file"> Changer d'image</label> 
        <input id ="file"name = "file" 
        type="file" accept = ".jpg, .jpeg, .png"
         onChange={(e)=>setFile(e.target.files[0])} 
        />
        <br/>
        <input type="submit" value="Envoyer"/>
        </form>
    );
};

export default UploadImage;