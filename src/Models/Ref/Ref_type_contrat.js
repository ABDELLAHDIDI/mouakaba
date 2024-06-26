const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Ref_type_contrat = sequelize.define('ref_type_contrat', {
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

  return Ref_type_contrat;
};
