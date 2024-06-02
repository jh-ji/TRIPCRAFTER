const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      scheduleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      scheduleName: {
        type: Sequelize.STRING(200),
        allowNull: true,
        
      },
      startDate: {
        type: Sequelize.STRING(30),
        allowNull: true,
        
      },
      endDate: {
        type: Sequelize.STRING(30),
        allowNull: true,
        
      },
      member1Tel: {
        type: Sequelize.STRING(20),
        allowNull: true,
        
      },
      member1Name: {
        type: Sequelize.STRING(10),
        allowNull: true,
       
      },
      member2Tel: {
        type: Sequelize.STRING(20),
        allowNull: true,
        
      },
      member2Name: {
        type: Sequelize.STRING(10),
        allowNull: true,
       
      },
      member3Tel: {
        type: Sequelize.STRING(20),
        allowNull: true,
        
      },
      member3Name: {
        type: Sequelize.STRING(10),
        allowNull: true,
       
      },
      member4Tel: {
        type: Sequelize.STRING(20),
        allowNull: true,
        
      },
      member4Name: {
        type: Sequelize.STRING(10),
        allowNull: true,
       
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Schedulelist',
      tableName: 'scheduleslist',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  
};
