const faker = require('faker');

module.exports = {
  up: async (queryInterface) => {
    const userRows = await getQueryResults(queryInterface, 'Users');
    const religionRows = await getQueryResults(queryInterface, 'Religions');
    const politicalViewRows = await getQueryResults(
      queryInterface,
      'PoliticalViews'
    );
    const relationshipStatusRows = await getQueryResults(
      queryInterface,
      'RelationshipStatuses'
    );

    const educationLevelRows = await getQueryResults(
      queryInterface,
      'EducationLevels'
    );

    const userProfileArrayMap = userRows.map((user) => {
      return {
        userId: user.id,
        job: faker.name.jobTitle(),
        height: faker.datatype.number(108),
        hometown: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
        religion:
          religionRows[Math.floor(Math.random() * religionRows.length)].id,
        politicalView:
          politicalViewRows[
            Math.floor(Math.random() * politicalViewRows.length)
          ].id,
        relationshipStatus:
          relationshipStatusRows[
            Math.floor(Math.random() * relationshipStatusRows.length)
          ].id,
        educationLevel:
          educationLevelRows[
            Math.floor(Math.random() * educationLevelRows.length)
          ].id,
        haveKids: faker.datatype.boolean(),
        wantKids: faker.datatype.boolean(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
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
