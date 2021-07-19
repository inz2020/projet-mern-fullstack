import React,{useState} from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');

    const handleLogin=(e)=>{
        e.preventDefault();
        const emailError= document.querySelector('.email.error')
        const passwordError= document.querySelector('.password.error')
        axios({
            method:"post",
            url:`${process.env.REACT_APP_API_URL}api/users/login`,
            withCredentials:true,
            data:{
                email,
                password,
            },
        })
        .then(
            (res)=>{
                console.log(res)
                if (res.data.errors){
                emailError.innerHTML= res.data.errors.email;
                passwordError.innerHTML= res.data.errors.password;

            }
            else{
                window.location='/';
            }
        })

        .catch(
            (err)=>console.log(err)
        )

    }
    return (   
    <div>
        <h2>Connexion</h2><br/>
        <form action="" onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor="email">Email:</label> <br/>
            <input type="text" id="email" name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/><br/>
            <div className="email error"></div>

            <label htmlFor="password">Mot de passe:</label><br/>

            <input type="password" id="password" name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)} />
            
            <div className="password error"></div>
            <br/><br/>
            <button type="submit" value="Se connecter">Se connecter</button> 
            
        </form>
        </div>
    );
};

export default SignInForm;