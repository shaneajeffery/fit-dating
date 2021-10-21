const { v4: uuidv4 } = require('uuid');

module.exports = {
  Query: {
    async getActivity(_, { id }, { models }) {
      return models.Activity.findByPk(id);
    },
    async listActivities(root, _, { models }) {
      return models.Activity.findAll({});
    },
  },

  Mutation: {
    async createActivity(_, { name }, { models }) {
      try {
        return await models.Activity.create({
          id: await uuidv4(),
          name,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async updateActivity(_, { id, name }, { models }) {
      try {
        const activity = await models.Activity.findByPk(id);

        if (!activity) {
          throw new Error(`Couldn’t find activity with id ${id}`);
        }

        activity.name = name;
        await activity.save();

        return activity;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async deleteActivity(_, { id }, { models }) {
      try {
        const rowsDeleted = await models.Activity.destroy({ where: { id } });

        return {
          rowsDeleted,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
