const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Esco_occupations_skills_relations = sequelize.define('Esco_occupations_skills_relations', {
    relation_type: {
      type: DataTypes.STRING(255),
    }
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  });

  return Esco_occupations_skills_relations;
};
