const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Esco_skill_groupe = sequelize.define('esco_skill_groupe', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    preferredLabel: {
      type: DataTypes.STRING(255),
    },
    code: {
      type: DataTypes.STRING(255),
    },
    description: {
      type: DataTypes.TEXT,
    },
    concepturi: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.TEXT,
    },
    niveau: {
      type: DataTypes.INTEGER(11),
    },
    conceptType: {
      type: DataTypes.STRING(255),
    },
    altLabels: {
      type: DataTypes.TEXT,
    },
    hiddenLabels: {
      type: DataTypes.TEXT,
    },
    modifiedDate: {
      type: DataTypes.DATE,
    },
    inScheme: {
      type: DataTypes.STRING(255),
    },
    scopeNote: {
      type: DataTypes.STRING(255),
    },
  }, {
    timestamps: true,
    paranoid: true,
  });


  Esco_skill_groupe.associate =  function(db) {
    Esco_skill_groupe.hasOne( db['Ref_esco_skill'] );
    db['Ref_esco_skill'].belongsTo(Esco_skill_groupe);

    Esco_skill_groupe.hasOne(Esco_skill_groupe, { as: 'parent' });
};

  return Esco_skill_groupe;
};
