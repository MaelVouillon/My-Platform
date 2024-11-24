// models/WorkflowLog.js

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

class WorkflowLog extends Model {}

WorkflowLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    workflowId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'WorkflowLog',
    tableName: 'workflow_logs',
    timestamps: true,
  }
);

module.exports = WorkflowLog;