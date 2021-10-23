// const bcrypt = require('bcryptjs');
// const jsonwebtoken = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');
// const Op = require('Sequelize').Op;

module.exports = {
  Query: {
    async getUserProfile(root, { userId }, { models }) {
      const data = await models.UserProfile.findOne({
        where: { userId },
        include: [
          {
            model: models.Religion,
            as: '_religion',
          },
        ],
      });

      console.log(data.toJSON());

      return data;
    },
  },
};
