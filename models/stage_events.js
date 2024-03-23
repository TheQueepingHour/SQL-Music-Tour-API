'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StageEvents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  stage_events.init({
    stage_event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    stage_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    event_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StageEvents',
    tableName: 'stage_events',
    timestamps: false
  });
  return StageEvents;
};