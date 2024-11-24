// workflows/actions/sendEmailAction.js

const nodemailer = require('nodemailer');
const emailConfig = require('../../config/emailConfig'); // Chemin relatif

class SendEmailAction {
  /**
   * Exécute l'action d'envoi d'email.
   * @param {Object} config - Configuration spécifique à l'action.
   * @param {Object} inputData - Données nécessaires pour personnaliser l'email.
   * @returns {Object} Résultat de l'envoi d'email.
   */
  static async execute(config, inputData) {
    try {
      // Configuration du transporteur SMTP
      const transporter = nodemailer.createTransport(emailConfig);

      // Construction de l'email
      const mailOptions = {
        from: emailConfig.sender, // Expéditeur
        to: config.to, // Destinataire(s)
        subject: config.subject || 'Notification', // Objet
        text: config.text || 'Voici un message généré automatiquement.', // Texte brut
        html: config.html || inputData.htmlContent || '<p>Aucun contenu HTML fourni.</p>', // Contenu HTML
      };

      // Envoi de l'email
      const info = await transporter.sendMail(mailOptions);

      console.log(`Email envoyé : ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Erreur lors de l\'envoi d\'email :', error.message);
      return { success: false, error: error.message };
    }
  }
}

module.exports = SendEmailAction;
