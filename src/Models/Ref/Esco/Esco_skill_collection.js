const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Esco_skill_collection = sequelize.define('esco_skill_collection', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING(255),
    },
    code: {
      type: DataTypes.STRING(255),
    },
  }, {
    timestamps: true,
    paranoid: true,
  });


  
  Esco_skill_collection.associate =  function(db) {

    Esco_skill_collection.hasOne(db['Ref_esco_skill'])
    db['Ref_esco_skill'].belongsTo(Esco_skill_collection)
};

  return Esco_skill_collection;
};
