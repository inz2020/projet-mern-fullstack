module.exports.signUpErrors= (err)=>{
    let errors= {pseudo: "", email:"", password:""};
if(err.message.includes("pseudo")) errors.pseudo= 'Pseudo incorrect ou déjà pris';

if(err.message.includes("email")) errors.email= 'Email incorrect!!';

if(err.message.includes("password")) errors.password= 'le mot de passe doit cntenir au minimumn 8 caractères';

if(err.code===11000 && Object.keys(err.keyValue)[0].includes("pseudo"))  
errors.pseudo= 'Cet pseudo est dejà enregistré';

if(err.code===11000 && Object.keys(err.keyValue)[0].includes("email"))  
errors.email= 'Cet email est dejà pris';

return errors;
};

module.exports.signInErrors= (err)=>{
    let errors= {email:"", password:""};

    if(err.message.includes("email")) errors.email="Email inconnu!!";

    if(err.message.includes("password")) errors.password="Password Incorrect!!";

    /* if(err.code===11000 && Object.keys(err.keyValue)[0].includes('email'))  errors.email= errors.email= 'Email incorrect!!';

    if(err.code===11000 && Object.keys(err.keyValue)[0].includes('password'))  errors.password= 'Password Incorrect!!';
 */
    return errors;

};