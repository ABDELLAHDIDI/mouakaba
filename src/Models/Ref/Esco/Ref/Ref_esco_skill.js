const { DataTypes } = require('sequelize'); 

module.exports = (sequelize) => {
  const Ref_esco_skill = sequelize.define('ref_esco_skill', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
    hiddenLabels: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING(255),
    },
    modifiedDate: {
      type: DataTypes.DATE,
    },
    scopeNote: {
      type: DataTypes.TEXT,
    },
    definition: {
      type: DataTypes.TEXT,
    },
    inScheme: {
      type: DataTypes.TEXT,
    } 
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  });


  
  Ref_esco_skill.associate =  function(db) {
    Ref_esco_skill.hasOne(Ref_esco_skill, { as: 'parent' });
    Ref_esco_skill.belongsTo(Ref_esco_skill, { as: 'child' });

    Ref_esco_skill.belongsToMany(db['Ref_esco_occupation'],{ through: db['Esco_occupations_skills_relations']  , as:'occupations' });
};

  return Ref_esco_skill;
};




