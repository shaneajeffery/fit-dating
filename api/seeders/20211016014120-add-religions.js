const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const religionArray = [
      'Adventist',
      'Agnostic',
      'Atheist',
      'Buddhist / Taoist',
      'Christian / Catholic',
      'Christian / LDS',
      'Christian / Protestant',
      'Christian / Other',
      'Hindu',
      'Jewish',
      'Muslim / Islam',
      'Spiritual but not religious',
      'Other',
    ];

    const religionArrayMap = await religionArray.map((religion) => {
      return {
        id: uuidv4(),
        name: religion,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Religions', religionArrayMap, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Religions', {});
  },
};
