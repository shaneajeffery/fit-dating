const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const genderArray = [
      'Female',
      'Male',
      'Cisgender',
      'Non-binary and/or genderqueer',
      'Transgender',
    ];

    const genderArrayMap = await genderArray.map((gender) => {
      return {
        id: uuidv4(),
        name: gender,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Genders', genderArrayMap, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Genders', {});
  },
};
