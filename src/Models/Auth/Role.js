const { DataTypes } = require('sequelize');
const Permission = require('./Permission');

module.exports = (sequelize) => {
  const Role = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: true,
  });

 

  Role.associate = function(db) {
    Role.belongsToMany(db['Permission'], { through: 'roles_permissions' });
    db['Permission'].belongsToMany(Role, { through: 'roles_permissions' });
};

  return Role;
};
