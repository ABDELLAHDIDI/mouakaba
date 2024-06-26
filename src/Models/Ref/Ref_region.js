

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  const Ref_region = sequelize.define('ref_region', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING,
    },
    lexique: {
      type: DataTypes.TEXT,
    },
    coefficient: {
      type: DataTypes.INTEGER(11),
    },
  }, {
    timestamps: true,
    paranoid: true,
  });

  return Ref_region;
};
