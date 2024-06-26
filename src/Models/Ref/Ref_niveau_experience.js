const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Ref_niveau_experience = sequelize.define('ref_niveau_experience', {
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

  return Ref_niveau_experience;
};
