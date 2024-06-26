const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Esco_skill_type = sequelize.define('esco_skill_type', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING(255),
    },
  }, {
    timestamps: true,
    paranoid: true,
  });


  Esco_skill_type.associate =  function(db) {
    Esco_skill_type.hasOne(db['Ref_esco_skill'])
    db['Ref_esco_skill'].belongsTo(Esco_skill_type)
};




  return Esco_skill_type;
};
