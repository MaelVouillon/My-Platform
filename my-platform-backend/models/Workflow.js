// représente la structure des données des workflows dans la base de données. Il fournit des méthodes pour créer, lire, mettre à jour, et supprimer les workflows.
// Définit les champs nécessaires pour un workflow
// Fournit des méthodes spécifiques pour interagir avec les workflows
// Utilise un ORM comme Sequelize pour communiquer avec la base
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

class Workflow extends Model {}

Workflow.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255], // Le nom doit contenir entre 3 et 255 caractères
      },
    },
    trigger: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    actions: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Workflow',
    tableName: 'workflows',
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

// Associations (relation : un workflow appartient à un utilisateur via "createdBy" ; l'association est définie avec "belongsTo")
Workflow.associate = (models) => {
  Workflow.belongsTo(models.User, {
    foreignKey: 'createdBy',
    as: 'owner',
  });
};

// Méthodes personnalisées (Récupère tous les workflows pour un utilisateur spécifique ; trie les workflow par date de création)
Workflow.findByUser = async function (userId) {
  return await this.findAll({
    where: {
      createdBy: userId,
    },
    order: [['createdAt', 'DESC']],
  });
};

module.exports = Workflow;
