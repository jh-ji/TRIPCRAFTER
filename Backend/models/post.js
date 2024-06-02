const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      location: {
        type: Sequelize.STRING(20),
        allowNull: false,
        
      },
      location: {
        type: Sequelize.STRING(20),
        allowNull: true,
        
      },
      isOpen: {
        type: Sequelize.STRING(10),
        allowNull: true,
        
      },
      brightness: {
        type: Sequelize.STRING(10),
        allowNull: true,
        
      },
      checkDate: {
        type: Sequelize.STRING(30),
        allowNull: true,
       
      },
      temp: {
        type: Sequelize.STRING(10),
        allowNull: true,
       
      },
      humidity: {
        type: Sequelize.STRING(10),
        allowNull: true,
       
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  
};
