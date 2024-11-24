// Utilité :
// gère la configuration de la connexion à la base de données pour l'application backend
// Définit les paramètres de connexion à la base de données
// Utilise un ORM (Sequelize) pour simplifier les interactions
// Permet de configurer différentes bases de données pour le développement, les tests, et la production

// Interactions avec le Reste du Programme
// Sequelize (ORM) : Passe les informations de connexion à Sequelize pour établir la communication avec la base
// Modèles : Fournit une instance de connexion que les modèles utilisent pour interagir avec la base
// Middleware : Peut être utilisé pour valider l’état de la connexion avant de traiter les requêtes
require('dotenv').config();
const { Sequelize } = require('sequelize');

const dbConfig = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password', // Utiliser DB_PASSWORD
    database: process.env.DB_NAME || 'my_platform_dev',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME_TEST || 'my_platform_test',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },
  },
};

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    pool: config.pool,
    logging: env === 'development' ? console.log : false,
  }
);

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie !');
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
    process.exit(1);
  }
};

module.exports = { sequelize, checkConnection };
