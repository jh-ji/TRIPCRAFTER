const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name : {
        type: Sequelize.STRING(20),
        allowNull: false,   
        primaryKey: true,
      },
      tel : {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false,   
      },
      groupname : {
        type: Sequelize.STRING(200),
        primaryKey: false,
        allowNull: true,   
      }
      
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  
};
