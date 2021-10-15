const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const dietaryInterestsArray = [
      'Gluten-free',
      'Paleo',
      'Vegan',
      'Keto',
      'Peleton',
      'Vegetarian',
      'Dairy-free',
    ];

    const dietaryInterestArrayMap = await dietaryInterestsArray.map(
      (dietaryInterest) => {
        return {
          id: uuidv4(),
          name: dietaryInterest,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
    );

    await queryInterface.bulkInsert(
      'DietaryInterests',
      dietaryInterestArrayMap,
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('DietaryInterests', {});
  },
};
