const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const ethnicityArray = [
      'Asian',
      'Black',
      'Hispanic / Latin',
      'Indian',
      'Middle Eastern',
      'Native American',
      'Pacific Islander',
      'White',
      'Other',
    ];

    const ethnicityArrayMap = await ethnicityArray.map((ethnicity) => {
      return {
        id: uuidv4(),
        name: ethnicity,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Ethnicities', ethnicityArrayMap, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Ethnicities', {});
  },
};
