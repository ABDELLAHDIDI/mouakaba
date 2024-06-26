const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Esco_skills_relations = sequelize.define('esco_skills_relations', {
    relation_type: {
      type: DataTypes.STRING(255),
    }
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  });


  
  Esco_skills_relations.associate =  function(db) {
    Esco_skills_relations.belongsTo(db['Ref_esco_skill'], { as: 'original', foreignKey: 'originalId' });
    Esco_skills_relations.belongsTo(db['Ref_esco_skill'], { as: 'related', foreignKey: 'relatedId' });
};

  return Esco_skills_relations;
};
