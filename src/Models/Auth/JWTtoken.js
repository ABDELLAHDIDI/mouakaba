const { DataTypes } = require('sequelize'); 

module.exports = (sequelize) => {
  const JWTtoken = sequelize.define('JWTtoken', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    token : {
      type: DataTypes.STRING(500),
    },
  }, {
    timestamps: false , 
  });


  JWTtoken.associate = function(db) {
        JWTtoken.hasOne(db['User']);
        
  };

  return JWTtoken;
};
