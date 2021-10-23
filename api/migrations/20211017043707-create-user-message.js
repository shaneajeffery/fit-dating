module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserMessages', {
      toUserId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
      },
      fromUserId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
      },
      messageId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      messageReadAt: {
        allowNull: true,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('UserMessages');
  },
};
