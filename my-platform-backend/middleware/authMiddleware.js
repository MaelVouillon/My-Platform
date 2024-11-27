// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Récupère le token de l'en-tête Authorization
  if (!token) {
    return res.status(401).json({ error: 'Accès non autorisé.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifie le token avec la clé secrète
    req.user = decoded; // Ajoute les informations de l'utilisateur à la requête
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalide.' });
  }
};