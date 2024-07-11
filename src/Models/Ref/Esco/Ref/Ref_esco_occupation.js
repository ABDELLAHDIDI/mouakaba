const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Ref_esco_occupation = sequelize.define('ref_esco_occupation', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(255),
    },
    preferredLabel: {
      type: DataTypes.TEXT,
    },
    altLabels: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    conceptType: {
      type: DataTypes.STRING(255),
    },
    conceptUri: {
      type: DataTypes.STRING(255),
    },
    iscoGroup: {
      type: DataTypes.STRING(255),
    },
    hiddenLabels: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING(255),
    },
    modifiedDate: {
      type: DataTypes.DATE,
    },
    regulatedProfessionNote: {
      type: DataTypes.TEXT,
    },
    scopeNote: {
      type: DataTypes.TEXT,
    },
    definition: {
      type: DataTypes.TEXT,
    },
    inScheme: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  });

  Ref_esco_occupation.associate = function(db) {
    Ref_esco_occupation.hasOne(Ref_esco_occupation, {as:'parent'});
   
    Ref_esco_occupation.hasOne(db['Structured_offer']);
    db['Structured_offer'].belongsTo(Ref_esco_occupation);

    Ref_esco_occupation.belongsToMany(db['Ref_esco_skill'] , { through: db['Esco_occupations_skills_relations'] })

};

  return Ref_esco_occupation;
};
