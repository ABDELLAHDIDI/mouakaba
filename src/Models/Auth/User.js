const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
        set(value) { 

        const hashedValue  =    bcrypt.hashSync(value.toString(), parseInt(process.env.SALT_ROUNDS) ); 

   
        this.setDataValue('password', hashedValue  );
      
      },
    },
    active: {
      type: DataTypes.TINYINT(1),
    },
  }, {
    timestamps: true,
      // hooks: {
      //   beforeCreate: async (user) => {
      //     if (user.password) {
      //       user.password = await bcrypt.hash(user.password.toString(), parseInt(process.env.SALT_ROUNDS));
      //     }
      //   },
      //   beforeUpdate: async (user) => {
      //     if (user.password && user.changed('password')) {
      //       user.password = await bcrypt.hash(user.password.toString(), parseInt(process.env.SALT_ROUNDS));
      //     }
      //   },
      // }
  });


  User.associate = function(db) {
          db['Role'].hasOne(User);
          User.belongsTo(db['Role']);

         User.belongsTo(db['JWTtoken']);
  };

  return User;
};
