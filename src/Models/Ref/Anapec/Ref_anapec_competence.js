const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Ref_anapec_competence = sequelize.define('ref_anapec_competence', {
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


  
  Ref_anapec_competence.associate =  function(db) {
    Ref_anapec_competence.hasOne(db['Ref_esco_skill'])
    db['Ref_esco_skill'].belongsTo(Ref_anapec_competence)
};


  return Ref_anapec_competence;
};
