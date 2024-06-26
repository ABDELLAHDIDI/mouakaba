const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Ref_rem = sequelize.define('ref_rem', {
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


  Ref_rem.associate = function(db) {
    Ref_rem.belongsToMany(db['Ref_esco_occupation'], { through: 'occupation_rem_affectations' });
    db['Ref_esco_occupation'].belongsToMany(Ref_rem, { through: 'occupation_rem_affectations' });
};


  return Ref_rem;
};
