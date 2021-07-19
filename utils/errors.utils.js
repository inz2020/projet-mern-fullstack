module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: '' };
    if (err.message.includes("pseudo")) errors.pseudo = 'Pseudo incorrect ou déjà pris';

    if (err.message.includes("email")) errors.email = 'Email incorrect!!';

    if (err.message.includes("password")) errors.password = 'le mot de passe doit contenir au minimumn 8 caractères';

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
        errors.pseudo = 'Cet pseudo est dejà enregistré';

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = 'Cet email est dejà pris';


    // errors = { pseudo: "Pseudo Incorrect", email: "Mail inconnu", password: 'Password Incorrect!!' }

    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' };

    if (err.message.includes("email"))
        errors.email = 'Email incorrect!!';

    if (err.message.includes("password")) errors.password = 'Password Incorrect!!';

    errors = { email: "Mail inconnu", password: 'Password Inconnu!!' }

    return errors;

};


module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: "" };

    if (err.message.includes('invalid file')) errors.format = "Format imcompatible";

    if (err.message.includes('max size')) errors.maxSize = "Taille maximale incorrecte, supérieure à 500Ko";

    return errors;
}