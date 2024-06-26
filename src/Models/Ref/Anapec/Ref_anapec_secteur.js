

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  const Ref_anapec_secteur = sequelize.define('ref_anapec_secteur', {
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

  return Ref_anapec_secteur;
};
