const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const activityArray = [
      'F45',
      'Crossfit',
      'Weightlifting',
      'Powerlifting',
      'Peleton',
      'Mountain Biking',
      'Road Biking',
      'Spin Cycling',
      'Yoga',
      'Pilates',
      'Trail Running',
      'Distance Running',
      'Martial Arts',
      'Swimming',
      'Orange Theory',
      'SoulCycle',
    ];

    const activityArrayMap = await activityArray.map((activity) => {
      return {
        id: uuidv4(),
        name: activity,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Activities', activityArrayMap, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Activities', {});
  },
};
