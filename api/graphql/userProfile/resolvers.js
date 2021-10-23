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
          {
            model: models.PoliticalView,
            as: '_politicalView',
          },
          {
            model: models.RelationshipStatus,
            as: '_relationshipStatus',
          },
          {
            model: models.EducationLevel,
            as: '_educationLevel',
          },
        ],
      });

      return data;
    },
  },
};
