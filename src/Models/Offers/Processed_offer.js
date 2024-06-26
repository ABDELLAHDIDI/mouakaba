const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Processed_offer = sequelize.define('processed_offer', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_poste: {
      type: DataTypes.STRING(255),
    },
    salaire: {
      type: DataTypes.TEXT,
    },
    entreprise: {
      type: DataTypes.TEXT,
    },
    secteur: {
      type: DataTypes.STRING(255),
    },
    poste: {
      type: DataTypes.STRING(255),
    },
    fonction: {
      type: DataTypes.STRING(255),
    },
    date: {
      type: DataTypes.STRING(255),
    },
    region: {
      type: DataTypes.TEXT,
    },
    formation: {
      type: DataTypes.STRING(255),
    },
    niv_experience: {
      type: DataTypes.STRING(255),
    },
    type_de_contrat: {
      type: DataTypes.STRING(255),
    },
    langue_demande: {
      type: DataTypes.STRING(255),
    },
    description_entreprise: {
      type: DataTypes.TEXT,
    },
    description_poste: {
      type: DataTypes.TEXT,
    },
    profil_recherche: {
      type: DataTypes.TEXT,
    },
    source: {
      type: DataTypes.STRING(255),
    },
    src_offre_emploi: {
      type: DataTypes.STRING(255),
    },
    url: {
      type: DataTypes.STRING(255),
    },
    format_Date: {
      type: DataTypes.STRING(255),
    },
    page_processed: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: true,
    paranoid: true,
  });


  Processed_offer.associate = function(db) {
    Processed_offer.hasOne(db['Structured_offer']);
    db['Structured_offer'].belongsTo(Processed_offer); 
};



  return Processed_offer;
};
