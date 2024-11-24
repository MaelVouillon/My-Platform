const express = require('express');
const app = express();
const workflowRoutes = require('./routes/workflowRoutes'); // Exemple de route

// Middleware global pour parser les JSON
app.use(express.json());

// Enregistrer les routes
app.use(workflowRoutes);

// Gestion des erreurs globales (optionnelle)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Erreur serveur' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

// Vérification de la connexion à la base de données
const { checkConnection } = require('./config/dbConfig');
checkConnection();
