const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Acl_metadata = sequelize.define('acl_metadata', {
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
      type: DataTypes.TEXT,
    },
    columns: {
      type: DataTypes.TEXT('long'),
    },
    pole_filters: {
      type: DataTypes.TINYINT(1),
    },
    centre_filters: {
      type: DataTypes.TINYINT(1),
    },
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  });

  return Acl_metadata;
};
