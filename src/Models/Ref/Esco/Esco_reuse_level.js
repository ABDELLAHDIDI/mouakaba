const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Esco_reuse_level = sequelize.define('esco_reuse_level', {
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

  
  Esco_reuse_level.associate =  function(db) {
    Esco_reuse_level.hasOne(db['Ref_esco_skill'])
    db['Ref_esco_skill'].belongsTo(Esco_reuse_level)
};

  return Esco_reuse_level;
};
