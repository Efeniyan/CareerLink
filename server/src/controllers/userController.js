// const bcrypt = require("bcryptjs");
// const bcrypt = require("bcryptjs");

// Importation des fonctions et de path
const { readJsonFile, writeJsonFile, generateId} = require('../utils/utils');
const path = require('path')

// 
const filePath = path.join(__dirname, "../models/users.json")

//  fonction pour l'authentification de connexion
const signIn = (req, res) => {
    console.log("sign in");
    try {
         // Récupértion des paramètres de la requète entrée par la l'user lors de la connexion
        const { email, password } = req.body;
        console.log(req.body)
        // Lecture de users.json
        let users = readJsonFile(filePath);
        // Vérification pour valider la connexion
        const user = users.filter( (el) => el.email === email && el.password === password );
        if (user.length) {
            res.status(200).send({
                msg: "Authentification réussie",
                // token: token,
                data: { email }
            });
            console.log("Authentification réussie")
        } else {
            res
                .status(200)
                .send({
                    msg: "Nom d'utilisateur ou mot de passe incorrect"
                })
                console.log("Nom d'utilisateur ou mot de passe incorrect")
        }

    } catch (error) {
        console.error(
            "erreur  est survenue lors de l'authentification de l'utilisateur ", error
        );
        
        res.status(500).send({
            msg: "Une erreur est survenue lors de la création de l'utilisateur "
        })
    }
};

//  fonction pour l'authentification de l'inscription 
const signUp = (req, res) => {
    try {
         // Récupértion des paramètres de la requète entrée par la l'user lors de l'inscription
        const { email, name, password } = req.body;
        console.log(req.body)

        // Creation d'un nouveau user
        const newUser = { id: generateId(), email, name, password };
        let users = readJsonFile(filePath);
        users.push(newUser);
        console.log(users);

        // Ajout du nouveau job dans users.json
        writeJsonFile(filePath, newUser);
        res 
        .status(200).json()
        .send({ msg: "Utilisateur ajouté avec succès ", data: newUser });
        
    } catch (error) {
        res.status(500).send({
            msg: "Une erreur est survenue lors de la création de l'utilisateur "
        })
    }
};


// Exportation des fonctionnnalités
module.exports = { signIn, signUp };