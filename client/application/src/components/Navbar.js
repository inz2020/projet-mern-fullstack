import React,{useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {UidContext} from './AppContext';
import Logout from './log/Logout.log';

import {useSelector} from 'react-redux';

const Navbar = () => {
    // Recuperer le uid et tester si le user a ses données
    const uid= useContext(UidContext);

    //Recuper la data de notre user etlui afficher  son pseudo dans la navbar
    const userData= useSelector(state => state.userReducer)

    //Utilisation de Redux
    return (
        <nav>
        <div className="nav-container">
        <div className="logo">
        <NavLink exact to="/">
        <div className="logo">
        <img src="./images/icon.png" alt=""/>
        <h3>Sikieye</h3>
        </div>
        </NavLink>
        </div>

        {/* Tester l'existence du uid créé. */}
        {uid?(
            <ul>
            <li></li>
            <li className="welcome">
            <NavLink exact to="/profil">
            <h3> Bienvenue  {userData.pseudo}!!</h3>
            </NavLink>
            </li>
            
            <Logout/>
            </ul>
        ):(
            <ul>
            <li>Inscrire/Connecter</li>
            <li className="welcome">
            <NavLink exact to="/profil">
            <img src="./images/icons/login.svg" alt="login"/>
            </NavLink>
            </li>
            </ul>
        )
        }
          
        </div>
        </nav>
    );
};

export default Navbar;