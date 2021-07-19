import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm.log';

const SignUpForm = () => {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [formSubmit, setFormSubmit]=useState(false);

    //Partie logique

    const handleRegister= async(e)=>{
        e.preventDefault();

        const pseudoError= document.querySelector('.pseudo.error');
        const emailError= document.querySelector('.email.error');
        const passwordError=document.querySelector('.password.error');
        const confirmPasswordError= document.querySelector('.confirmPassword.error');

        const terms= document.getElementById('terms');
        const termsError= document.querySelector('.terms.error');

        //remettre  à vide les champs  confirPass et terms
        confirmPasswordError.innerHTML="";
        termsError.innerHTML="";

        if(password!== confirmPassword || !terms.checked){
            if(password!==confirmPassword){
                confirmPasswordError.innerHTML="Les mots de passe ne correspondent pas";

                if(!terms.checked){
                    termsError.innerHTML="Veuillez valider les conditions générales";
                }
            }
        }
// Donc si tout se passe bien, on accede au traitement backend
        else{
            await axios({
                method:"post",
                url:`${process.env.REACT_APP_API_URL}api/users/register`,
                data:{
                    pseudo,
                    email,
                    password
                }
            })
            .then(
                (res)=>{
                    if(res.data.errors){
                        pseudoError.innerHTML= res.data.errors.pseudo;
                        emailError.innerHTML= res.data.errors.email;
                        passwordError.innerHTML= res.data.errors.password;
                    }
                    else{setFormSubmit(true);}
                })
            .catch(
                (err)=>console.log("erreur d'inscription: ", err)
            )}

    }

    return (
         <div>
         {formSubmit ? (
             <>
         <SignInForm/>
         <h4 className="success">Enregistrement réussi, Veuillez-vous connecter!!</h4>
         </>):
       (  <form action ="" onSubmit={handleRegister} id="sign-up-form">

            <label htmlFor="pseudo">Pseudo</label><br/>
            <input id="pseudo" name="pseudo" value={pseudo} type="text"
            onChange={(e)=>{setPseudo(e.target.value)}}/>
            <br/>
            <div className="pseudo error"></div> 
            <br/>

            <label htmlFor="email">Email</label><br/>
            <input id="email"  name="email" value={email} type="text"
            onChange={(e)=>setEmail(e.target.value)}/>
            <br/>
            <div className="email error"></div> 
            <br/>

            <label htmlFor="password">Mot de passe</label><br/>
            <input id="password" name="password" value={password} type="password"
            onChange={(e)=>setPassword(e.target.value)}/>
            <br/>
            <div className="password error"></div> 
            <br/>

            <label htmlFor="confirmPassword">Confirmation de mot de passe</label><br/>
            <input id="confirmPassword" name="password" value={confirmPassword} type="password"
            onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <br/>
            <div className="confirmPassword error"></div> 
            <br/><br/>

           
            <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="nooponer nooponer">{''}conditions générales</a></label>
            <input type="checkbox"  id="terms" name="terms" />
            <div className="terms error"></div> 
            <br/>

            <button type="submit" value="valider">Valider</button>
        </form>
        )}
        </div>
    );
};

export default SignUpForm;