const Op = require('Sequelize').Op;
const { v4: uuidv4 } = require('uuid');

module.exports = {
  Query: {
    async getUserMessages(_, { userId }, { models }) {
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

  Mutation: {
    async createUserMessage(_, { toUserId, fromUserId, message }, { models }) {
      try {
        return await models.UserMessage.create({
          toUserId,
          fromUserId,
          messageId: uuidv4(),
          message,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async updateMessageReadAt(_, { messageId }, { models }) {
      try {
        const message = await models.UserMessage.findOne({
          where: { messageId },
        });

        if (!message) {
          throw new Error(`Couldn’t find message with id ${messageId}`);
        }

        message.messageReadAt = new Date();
        await message.save();

        return message;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
