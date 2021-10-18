module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserProfiles', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      job: {
        type: Sequelize.STRING,
      },
      height: {
        type: Sequelize.STRING,
      },
      hometown: {
        type: Sequelize.STRING,
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

    await queryInterface.addColumn('UserProfiles', 'religion', {
      type: Sequelize.UUID,
      references: {
        model: 'Religion',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      defaultValue: null,
      after: 'can_maintain_system',
    });

    await queryInterface.addColumn('UserProfiles', 'politicalView', {
      type: Sequelize.UUID,
      references: {
        model: 'PoliticalView',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      defaultValue: null,
      after: 'can_maintain_system',
    });

    await queryInterface.addColumn('UserProfiles', 'relationshipStatus', {
      type: Sequelize.UUID,
      references: {
        model: 'RelationshipStatus',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      defaultValue: null,
      after: 'can_maintain_system',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('UserProfiles');
  },
};
