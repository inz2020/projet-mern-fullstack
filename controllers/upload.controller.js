const userModel = require('../models/user.model');
const fs = require('fs')
const { promisify } = require('util');
const { uploadErrors } = require('../utils/errors.utils');
const pipeline = promisify(require("stream").pipeline);

//Vérification du format de l'image
module.exports.uploadProfil = async(req, res) => {
    console.log(req.file, req.body)

    try {
        if (req.file.detectedMimeType !== "image/jpg" &&
            req.file.detectedMimeType !== "image/png" &&
            req.file.detectedMimeType !== "image/jpeg")

            throw Error("invalid file");

        if (req.file.size > 500000) throw Error("max size");

    } catch (err) {
        const errors = uploadErrors(err)
        return res.status(201).json({ errors });

    }
    //Transformer n'importe quelle image en format jpg=>Toutes les photos serot uniques
    const filename = req.body.name + ".jpg";
    //le pipeline permet de créer le fichier(chemin) via le fs
    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/application/public/uploads/profil/${filename}`
        )
    );

    try {
        await userModel.findByIdAndUpdate(
            req.body.userId, { $set: { image: "./uploads/profil/" + filename } }, {
                new: true,
                $upsert: true,
                setDefaultsOnInsert: true
            },
            (err, docs) => {
                if (!err) return res.send(docs)
                else return res.status(500).send({ message: err })
            }
        )
    } catch (err) {
        return res.status(500).send({ message: err })
    }

}