// Rôle : Définit les routes API pour les workflows
// Dépendances : 
// express : Pour créer et gérer les routes
// workflowController.js : Contient les fonctions associées à chaque endpoint.
// authMiddleware.js : Middleware pour vérifier l'authentification de l'utilisateur
// validationMiddleware.js : Middleware pour valider les données des requêtes

const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');

// Logs de débogage
console.log('authMiddleware type:', typeof authMiddleware); // Devrait afficher 'function'
console.log('validateWorkflowCreation type:', typeof validationMiddleware.validateWorkflowCreation); // 'function'
console.log('createWorkflow type:', typeof workflowController.createWorkflow); // 'function'
console.log('getAllWorkflows type:', typeof workflowController.getAllWorkflows); // 'function'
console.log('getWorkflowById type:', typeof workflowController.getWorkflowById); // 'function'
console.log('updateWorkflow type:', typeof workflowController.updateWorkflow); // 'function'
console.log('deleteWorkflow type:', typeof workflowController.deleteWorkflow); // 'function'
console.log('executeWorkflow type:', typeof workflowController.executeWorkflow); // 'function'

// Créer un nouveau workflow
router.post(
  '/api/workflows',
  authMiddleware, // Middleware d'authentification
  validationMiddleware.validateWorkflowCreation, // Middleware de validation
  workflowController.createWorkflow // Contrôleur
);

// Récupérer la liste de tous les workflows
router.get(
  '/api/workflows',
  authMiddleware, // Middleware d'authentification
  workflowController.getAllWorkflows // Contrôleur
);

// Récupérer un workflow spécifique par son ID
router.get(
  '/api/workflows/:id',
  authMiddleware, // Authentification requise
  workflowController.getWorkflowById // Contrôleur
);

// Mettre à jour un workflow
router.put(
  '/api/workflows/:id',
  authMiddleware, // Authentification requise
  validationMiddleware.validateWorkflowUpdate, // Middleware de validation
  workflowController.updateWorkflow // Contrôleur
);

// Supprimer un workflow
router.delete(
  '/api/workflows/:id',
  authMiddleware, // Authentification requise
  workflowController.deleteWorkflow // Contrôleur
);

// Exécuter un workflow
router.post(
  '/api/workflows/execute',
  authMiddleware, // Authentification requise
  validationMiddleware.validateWorkflowExecution, // Middleware de validation
  workflowController.executeWorkflow // Contrôleur
);

module.exports = router;
