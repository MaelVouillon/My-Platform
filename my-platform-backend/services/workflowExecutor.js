// Orchestrateur principal pour l’exécution des workflows. Ce fichier lit les étapes d’un workflow, valide les déclencheurs, et exécute les actions associées.

const Workflow = require('../models/Workflow');
const WorkflowLog = require('../models/WorkflowLog.js'); // Assurez-vous que ce chemin est correct
const sendEmailAction = require('../workflows/actions/sendEmailAction');
const generateChartAction = require('../workflows/actions/generateChartAction');
const exportFileAction = require('../workflows/actions/exportFileAction');
const notifyUserAction = require('../workflows/actions/notifyUserAction');
const helpers = require('../middleware/helpers.js');
const ManualTrigger = require('../workflows/triggers/manualTrigger'); // Chemin relatif

// Actions disponibles pour l'exécution
const actionMap = {
  sendEmail: sendEmailAction, // Envoi d'un e-mail
  generateChart: generateChartAction, // Génération d'un graphique
  exportFile: exportFileAction, // Exportation d'un fichier
  notifyUser: notifyUserAction, // Notification d'un utilisateur
};

// Classe pour exécuter un workflow
class WorkflowExecutor {
  /**
   * Exécute un workflow.
   * @param {Object} workflow - Le workflow à exécuter.
   * @param {Object} inputData - Données d'entrée nécessaires pour exécuter le workflow.
   * @returns {Object} Résultat de l'exécution.
   */
  static async execute(workflow, inputData) {
    try {
      console.log(`Début d'exécution du workflow : ${workflow.name}`);

      if (!this.validateTrigger(workflow.trigger, inputData)) {
        return { success: false, message: 'Déclencheur non valide.' };
      }

      const results = [];
      for (const action of workflow.actions) {
        const actionHandler = actionMap[action.type];

        if (!actionHandler) {
          throw new Error(`Action inconnue : ${action.type}`);
        }

        console.log(`Exécution de l'action : ${action.type}`);
        const result = await actionHandler.execute(action.config, inputData);
        results.push({ action: action.type, result });
      }

      await WorkflowLog.create({
        workflowId: workflow.id,
        status: 'success',
        message: 'Workflow exécuté avec succès.',
      });

      return { success: true, results };
    } catch (error) {
      console.error(`Erreur lors de l'exécution du workflow : ${error.message}`);
      await WorkflowLog.create({
        workflowId: workflow.id,
        status: 'error',
        message: error.message,
      });
      return { success: false, message: error.message };
    }
  }

  static validateTrigger(trigger, inputData) {
    if (trigger.type === 'manualTrigger') {
      return ManualTrigger.validate(trigger, inputData);
    }
    return true;
  }
}

module.exports = WorkflowExecutor;
