module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserDietaryInterests', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
      },
      dietaryInterestId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: { model: 'DietaryInterests', key: 'id' },
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
    await queryInterface.dropTable('UserActivities');
  },
};
