const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const educationLevelArray = [
      'High School',
      'Some College',
      'Associate Degree',
      'Bachelors Degree',
      'Graduate Degree',
      'PhD / Post Doctoral',
    ];

    const educationLevelArrayMap = await educationLevelArray.map(
      (educationLevel) => {
        return {
          id: uuidv4(),
          name: educationLevel,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
    );

    await queryInterface.bulkInsert(
      'EducationLevels',
      educationLevelArrayMap,
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('EducationLevels', {});
  },
};
