// const bcrypt = require("bcryptjs");


// Importation des fonctions et de path
const { readJsonFile, writeJsonFile, generateId} = require('../utils/utils');
const path = require('path')

// 
const filePath = path.join(__dirname, "../models/users.json")

//  fonction pour l'authentification de connexion

const signIn = (req, res) => {
    try {
        // Récupération des paramètres de la requête envoyés par l'utilisateur
        const { email, password } = req.body;

        // Vérification que les champs email et password sont présents
        if (!email || !password) {
            return res.status(400).send({
                msg: "Veuillez fournir à la fois l'email et le mot de passe."
            });
        }

        // Lecture du fichier users.json
        let users = readJsonFile(filePath);

        // Recherche de l'utilisateur par email et mot de passe
        const user = users.find((el) => el.email === email && el.password === password);

        if (user) {
            // Authentification réussie
            res.status(200).send({
                msg: "Authentification réussie",
                data: { email }
            });
            console.log("Authentification réussie pour l'email:", email);
        } else {
            // Nom d'utilisateur ou mot de passe incorrect
            res.status(401).send({
                msg: "Nom d'utilisateur ou mot de passe incorrect"
            });
            console.log("Nom d'utilisateur ou mot de passe incorrect pour l'email:", email);
        }

    } catch (error) {
        console.error("Une erreur est survenue lors de l'authentification de l'utilisateur:", error);
        
        // En cas d'erreur interne, on renvoie un statut 500
        res.status(500).send({
            msg: "Une erreur est survenue lors de l'authentification. Veuillez réessayer plus tard."
        });
    }
};


//  fonction pour l'authentification de l'inscription 
// const signUp = (req, res) => {
//     try {
//          // Récupértion des paramètres de la requète entrée par la l'user lors de l'inscription
//         const { name, email, localite, password } = req.body;
//         console.log(req.body)

//         // Creation d'un nouveau user
//         const newUser = { id: generateId(), name, email, localite, password };
//         let users = readJsonFile(filePath);
//         users.push(newUser);
//         // console.log(users);

//         // Ajout du nouveau job dans users.json
//         writeJsonFile(filePath, newUser);
//         res 
//         .status(200).json()
//         .send({ msg: "Utilisateur ajouté avec succès ", data: newUser });
        
//     } catch (error) {
//         res.status(500).send({
//             msg: "Une erreur est survenue lors de la création de l'utilisateur "
//         })
//     }
// };

const signUp = (req, res) => {
    try {
        const { name, email, localite, password, confirmpassword } = req.body;
        console.log(req.body)
        
        // Vérification des champs
        if (!name || !email || !localite || !password || !confirmpassword) {
            return res.status(400).send({
                msg: "Tous les champs doivent être remplis."
            });
        }

        // Vérification de la correspondance des mots de passe
        if (password !== confirmpassword) {
            return res.status(400).send({
                msg: "Les mots de passe ne correspondent pas."
            });
        }

        // Lecture des utilisateurs existants
        let users = readJsonFile(filePath);

        // Vérification si un utilisateur avec le même email existe déjà
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).send({
                msg: "Un utilisateur avec cet email existe déjà."
            });
        }

        // Création du nouvel utilisateur
        const newUser = { id: generateId(), name, email, localite, password };

        // Ajout du nouvel utilisateur à la liste des utilisateurs
        users.push(newUser);

        // Écriture de la nouvelle liste d'utilisateurs dans le fichier
        writeJsonFile(filePath, users);

        // Réponse de succès
        res.status(200).send({
            msg: "Utilisateur ajouté avec succès.",
            data: newUser
        });

    } catch (error) {
        console.error("Une erreur est survenue lors de la création de l'utilisateur:", error);
        res.status(500).send({
            msg: "Une erreur est survenue lors de la création de l'utilisateur. Veuillez réessayer plus tard."
        });
    }
};





// Exportation des fonctionnnalités
module.exports = { signIn, signUp };