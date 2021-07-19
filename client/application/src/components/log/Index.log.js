import React from 'react';
import { useState } from 'react';
import SignUpForm from './SignUpForm.log';
import SignInForm from './SignInForm.log';

const Log = (props) => {

    const [signUpModal, setSignUpModal]=useState(props.signup);
    const [signInModal, setSignInModal]=useState(props.signin);

    const handleModals= (e)=>{
        if(e.target.id==="register"){
            setSignInModal(false);
            setSignUpModal(true);
        }
        else if(e.target.id==="login"){
            setSignInModal(true);
            setSignUpModal(false);

        }
    }
    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li id="register" onClick={handleModals}
                    className={signUpModal ? "active-btn": null}> S'inscrire</li>
                    <li id="login" onClick={handleModals}
                    className={signInModal ? "active-btn": null}> Se connecter </li>
                </ul>
                {signUpModal && <SignUpForm/>}
                {signInModal && <SignInForm/>}
            </div>
            
        </div>
    );
};

export default Log;