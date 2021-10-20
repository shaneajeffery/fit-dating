const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const genders = await queryInterface.sequelize.query(
      'SELECT id FROM "Genders"'
    );

    const genderRows = genders[0];

    const userArray = [
      {
        id: 'b291e2e9-d668-4b3d-a207-da73adaa872d',
        username: 'fstocking0',
        email: 'fkinsey0@nationalgeographic.com',
        password: 'uwc3ACJBsN0',
        phone: '4867950898',
        dateOfBirth: '09/22/2001',
        zipCode: '98665',
        gender: genderRows[Math.floor(Math.random() * genderRows.length)].id,
      },
      {
        id: 'ecad0a51-bf36-4ac7-ba1d-6b428b11c133',
        username: 'amance1',
        email: 'gloweth1@homestead.com',
        password: 'UFJ8UXo9tjFH',
        phone: '9176996531',
        dateOfBirth: '10/08/1989',
        zipCode: '98665',
        gender: genderRows[Math.floor(Math.random() * genderRows.length)].id,
      },
      {
        id: 'ce660a03-8021-4d3b-b98f-287c915ea0c8',
        username: 'jpolye2',
        email: 'xwoolliams2@gov.uk',
        password: 'qnkXYU2',
        phone: '1178874655',
        dateOfBirth: '03/10/1988',
        zipCode: '08-331',
        gender: genderRows[Math.floor(Math.random() * genderRows.length)].id,
      },
      {
        id: 'b3b10b6a-c2d9-4174-89a7-597b9122e155',
        username: 'sosbaldeston3',
        email: 'nyounge3@google.com.au',
        password: 'IYSTY8',
        phone: '2975292540',
        dateOfBirth: '05/20/1990',
        zipCode: '361603',
        gender: genderRows[Math.floor(Math.random() * genderRows.length)].id,
      },
      {
        id: 'a220d285-2adf-4ce7-a36d-224b1d069d95',
        username: 'jjanuaryst4',
        email: 'cvirr4@nba.com',
        password: '4wa0aD',
        phone: '1384442894',
        dateOfBirth: '12/24/1999',
        zipCode: '98665',
        gender: genderRows[Math.floor(Math.random() * genderRows.length)].id,
      },
      {
        id: 'ac49cf6e-5d09-443c-b6d7-c6c1341d09ce',
        username: 'jjaggard5',
        email: 'gfurst5@pbs.org',
        password: '8YHzkFmbCp',
        phone: '4698665112',
        dateOfBirth: '05/24/1997',
        zipCode: '98665',
        gender: genderRows[Math.floor(Math.random() * genderRows.length)].id,
      },
      {
        id: '282720b3-72ae-4c1f-9332-d8462765deb5',
        username: 'fmaycey6',
        email: 'kpauletto6@webmd.com',
        password: 'viPd4ZClDKtQ',
        phone: '5445621266',
        dateOfBirth: '05/24/2003',
        zipCode: '7461',
        gender: genderRows[Math.floor(Math.random() * genderRows.length)].id,
      },
      {
        id: '38d43f61-2093-4a29-9b64-40df9d639ed3',
        username: 'rprimo7',
        email: 'caspinal7@ucla.edu',
        password: 'hrI1CwTH',
        phone: '3931616139',
        dateOfBirth: '07/03/1998',
        zipCode: '734 91',
        gender: genderRows[Math.floor(Math.random() * genderRows.length)].id,
      },
    ];

    const userArrayMap = await userArray.map((user) => {
      return {
        ...user,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Users', userArrayMap, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', {});
  },
};
