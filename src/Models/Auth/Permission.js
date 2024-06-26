const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Permission = sequelize.define('permission', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    sujet: {
      type: DataTypes.STRING,
    },
    action: {
      type: DataTypes.STRING,
    },
    inverted: {
      type: DataTypes.TINYINT(1),
    },
    conditions: {
      type: DataTypes.TEXT('long'),
    },
    fields: {
      type: DataTypes.TEXT,
    },
    reason: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: true,
  });

  return Permission;
};
