const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Esco_occupation_groupe = sequelize.define('esco_occupation_groupe', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  }, {
    timestamps: false,  
    paranoid: false, 
  });


  Esco_occupation_groupe.associate = function(db) {
    Esco_occupation_groupe.hasOne(db['Ref_esco_occupation']);
    db['Ref_esco_occupation'].belongsTo(Esco_occupation_groupe);
};


  return Esco_occupation_groupe;
};
