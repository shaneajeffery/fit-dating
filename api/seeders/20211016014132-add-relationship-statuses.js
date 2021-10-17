const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const relationsipStatusArray = [
      'Never married',
      'Separated',
      'Divorced',
      'Widowed',
    ];

    const relationsipStatusArrayMap = await relationsipStatusArray.map(
      (relationshipStatus) => {
        return {
          id: uuidv4(),
          name: relationshipStatus,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
    );

    await queryInterface.bulkInsert(
      'RelationshipStatuses',
      relationsipStatusArrayMap,
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('RelationshipStatuses', {});
  },
};
