module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserProfiles', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
      },
      job: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      height: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      hometown: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      religion: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'Religions', key: 'id' },
      },
      politicalView: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'PoliticalViews', key: 'id' },
      },
      relationshipStatus: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'RelationshipStatuses', key: 'id' },
      },
      educationLevel: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'EducationLevels', key: 'id' },
      },
      haveKids: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      wantKids: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('UserProfiles');
  },
};
