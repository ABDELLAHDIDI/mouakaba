const { DataTypes } = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');

module.exports = (sequelize) => {
  const Ref_anapec_emploi = sequelize.define('ref_anapec_emploi', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING(255),
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


  Ref_anapec_emploi.associate = function(db) {
    Ref_anapec_emploi.belongsToMany(db['Ref_esco_occupation'] , {through:'occupations_anapec_affectations' });
    db['Ref_esco_occupation'].belongsToMany(Ref_anapec_emploi, {through:'occupations_anapec_affectations' });
};
 
  return Ref_anapec_emploi;
};
