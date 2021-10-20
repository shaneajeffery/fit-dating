const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const languageArray = [
      'Arabic',
      'Chinese',
      'Dutch',
      'English',
      'French',
      'German',
      'Hebrew',
      'Hindi',
      'Italian',
      'Japanese',
      'Korean',
      'Norwegian',
      'Portuguese',
      'Russian',
      'Spanish',
      'Swedish',
      'Tagalog',
      'Urdu',
      'Other',
    ];

    const languageArrayMap = await languageArray.map((language) => {
      return {
        id: uuidv4(),
        name: language,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Languages', languageArrayMap, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Languages', {});
  },
};
