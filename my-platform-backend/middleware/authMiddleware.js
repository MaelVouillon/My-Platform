// middleware/authMiddleware.js

module.exports = (req, res, next) => {
  // Logique d'authentification
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Accès non autorisé.' });
  }
  // Vérifiez le token ici...
  next();
};