const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const politicalViewArray = [
      'Apolitical',
      'Undecided',
      'Conservative',
      'Moderate',
      'Liberal',
      'Fiscally conservative, socially liberal',
      'Fiscally liberal, socially conservative',
      'Independent',
    ];

    const politicalViewArrayMap = await politicalViewArray.map(
      (politicalView) => {
        return {
          id: uuidv4(),
          name: politicalView,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
    );

    await queryInterface.bulkInsert(
      'PoliticalViews',
      politicalViewArrayMap,
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('PoliticalViews', {});
  },
};
