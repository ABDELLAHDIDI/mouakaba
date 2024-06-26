const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Ref_rec = sequelize.define('ref_rec', {
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
    freezeTableName: true,
  });


  
  Ref_rec.associate =  function(db) {
    Ref_rec.hasOne(db['Ref_esco_skill'])
    db['Ref_esco_skill'].belongsTo(Ref_rec)
};


  return Ref_rec;
};
