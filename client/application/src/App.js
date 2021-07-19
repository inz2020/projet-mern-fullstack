import React, { useEffect, useState } from 'react';
import { UidContext } from './components/AppContext';
import Routes from './components/routes/Index.route';
import axios from "axios";
import {useDispatch} from 'react-redux';
import {getUser} from './actions/User.action';


const App = () => {
  //Stocker l'id de notre user 
  const [uid, setUid]= useState(null);

  // dispatch pour declencher une action
  const dispatch= useDispatch();
  useEffect(
    ()=>{
    const fetchData= async()=>{
      await axios({
        method:"get",
        url:`${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials:true,

      })
      .then(
        (res)=>{
          //console.log(res);
          setUid(res.data)
        })
      .catch(
        (err)=>console.log("No token: ", err)
      )};
  
    fetchData();
    if(uid) dispatch(getUser(uid))
  
    },[uid, dispatch]);

  //  (  A chaque fois que le uid évolue, on relance le useEffect:d'ou le [uid])
  return (
    <div>
      {/* on pourra obtenir l'id de notre user à n'importe page de notre app */}
      <UidContext.Provider value={uid} >
      <Routes/>

      </UidContext.Provider>
   
      
    </div>
  );
};

export default App;
