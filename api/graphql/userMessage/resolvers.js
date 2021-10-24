const Op = require('Sequelize').Op;

module.exports = {
  Query: {
    async getUserMessages(root, { userId }, { models }) {
      const data = await models.UserMessage.findAll({
        where: {
          [Op.or]: [
            {
              toUserId: {
                [Op.eq]: userId,
              },
            },
            {
              fromUserId: {
                [Op.eq]: userId,
              },
            },
          ],
        },
        // Given that messaging shows the latest message the bottom,
        // we are just going to keep with the data following that same flow on return.
        order: [['createdAt', 'ASC']],
      });

      return data;
    },
  },

  // TODO: Need to have a CREATE and UPDATE mutation.
};
