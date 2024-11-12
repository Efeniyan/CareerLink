const jwt = require('jsonwebtoken');
const { readJsonFile, writeJsonFile, generateId } = require('../utils/utils');
const path = require('path');

// Chemin du fichier JSON contenant les utilisateurs
const filePath = path.join(__dirname, "../models/users.json");

// Clé secrète pour JWT
const SECRET_KEY = "jesuislamême"; // À personnaliser avec une clé plus forte

// Fonction pour l'authentification de connexion (avec JWT)
const signIn = (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        // Lecture de users.json
        let users = readJsonFile(filePath);
        console.log(users);
        
        // Vérification des identifiants
        const user = users.filter((el) => el.email === email && el.password === password );
        console.log(user)
        if (user) {
            // Génération d'un token JWT
            const token = jwt.sign({ id: user.id, username: user.name }, SECRET_KEY, { expiresIn: '2h' });
            
            // Envoi du token au client
            res.status(200).json({
                msg: "Authentification réussie",
                token: token, // Le token sera envoyé au client
                user: { id: user.id, email: user.email, name: user.name }
            });
        } else {
            res.status(401).send({ msg: "Email ou mot de passe incorrect" });
        }

    } catch (error) {
        console.error("Erreur lors de l'authentification de l'utilisateur", error);
        res.status(500).send({ msg: "Une erreur est survenue lors de l'authentification" });
    }
};

// Fonction pour l'inscription (avec JWT)
const signUp = (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Lecture de users.json
        let users = readJsonFile(filePath);

        // Vérifier si l'email est déjà utilisé
        const userExists = users.find((user) => user.email === email);
        if (userExists) {
            return res.status(409).send({ msg: "Cet email est déjà utilisé." });
        }

        // Création d'un nouveau user
        const newUser = { id: generateId(), email, password, name };
        users.push(newUser);

        // Réécriture du fichier JSON avec le nouvel utilisateur
        writeJsonFile(filePath, users);

        // Génération d'un token JWT pour le nouvel utilisateur
        const token = jwt.sign({ id: newUser.id, username: newUser.name }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).send({
            msg: "Utilisateur ajouté avec succès",
            token: token, // Envoi du token au client après inscription
            user: { id: newUser.id, email: newUser.email, name: newUser.name }
        });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur", error);
        res.status(500).send({ msg: "Une erreur est survenue lors de la création de l'utilisateur." });
    }
};

// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ msg: "Accès refusé. Aucun token fourni." });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
        req.user = decoded; 
        next("/singn-in"); 
    } catch (error) {
        res.status(401).send({ msg: "Token invalide." });
    }
};

// Exportation des fonctions
module.exports = { signIn, signUp, verifyToken };
