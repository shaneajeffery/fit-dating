const faker = require('faker');

module.exports = {
  up: async (queryInterface) => {
    const userRows = await getQueryResults(queryInterface, 'Users');

    const userProfileArrayMap = userRows.map((user) => {
      //       const numberOfMessages = faker.datatype.number(10);
      //       const userMessages = [];
      //       for (let i = 0; i < numberOfMessages; i++) {
      // userMessages.push({
      //         userId: user.id,
      //         fromUserId:
      //         job: faker.name.jobTitle(),
      //         height: faker.datatype.number(108),
      //         hometown: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
      //         religion:
      //           religionRows[Math.floor(Math.random() * religionRows.length)].id,
      //         haveKids: faker.datatype.boolean(),
      //         wantKids: faker.datatype.boolean(),
      //         createdAt: new Date(),
      //         updatedAt: new Date(),
      //       };
      //       }
    });

    await queryInterface.bulkInsert('UserProfiles', userProfileArrayMap, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('UserProfiles', {});
  },
};

const getQueryResults = async (queryInterface, modelName) => {
  const results = await queryInterface.sequelize.query(
    `SELECT id FROM "${modelName}"`
  );

  return results[0];
};
