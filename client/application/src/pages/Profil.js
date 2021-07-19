import React,{useContext} from 'react';
import Log from '../components/log/Index.log';

import { UidContext } from '../components/AppContext';
import UpdateProfil from '../components/profil/UpdateProfil.profil';

const Profil = () => {

    //On stocke l'id du user dans uid si il est connecté
    const uid= useContext(UidContext);
    return ( <div className = "profil-page" >
        {/* Donc si cet uid est stocké, le user est redirigé vers la page UpdatePage sinon il s'inscrt. */}
        {uid?(
            <UpdateProfil/>
        ):(
            <div className = "log-container" >
            {/* sur la page de profil, on incite l'user à s'inscrire par défaut */}
            <Log signin={false} signup={true}/>
            <div className="img-container">
                <img src="./images/log.svg" alt=""/>
            </div>

        </div> 

        )}
        
        </div>
    );
};

export default Profil;