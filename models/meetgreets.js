'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MeetGreets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Band, Event}) {
      MeetGreets.belongsTo(Band, {
        foreignKey: "band_id",
        as: "band"
      })

      MeetGreets.belongsTo(Event, {
        foreignKey: "event_id",
        as: "event"
      })
    }
  }
  MeetGreets.init({
    meet_greet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    event_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    band_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    meet_start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    meet_end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'MeetGreets',
    tableName: 'meet_greets',
    timestamps: false
  });
  return MeetGreets;
};