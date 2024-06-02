const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      scheduleId: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      date: {
        type: Sequelize.STRING(20),
        allowNull: true,
        
      },
      address: {
        type: Sequelize.STRING(300),
        allowNull: true,
        
      },
      phoneNumber: {
        type: Sequelize.STRING(20),
        allowNull: true,
        
      },
      placeName: {
        type: Sequelize.STRING(200),
        allowNull: true,
        
      },
      startTime: {
        type: Sequelize.STRING(10),
        allowNull: true,
       
      },
      endTime: {
        type: Sequelize.STRING(10),
        allowNull: true,
       
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Schedule',
      tableName: 'schedules',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  
};
