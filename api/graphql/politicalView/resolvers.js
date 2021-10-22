const { v4: uuidv4 } = require('uuid');

module.exports = {
  Query: {
    async getPoliticalView(root, { id }, { models }) {
      return models.PoliticalView.findByPk(id);
    },
    async listPoliticalViews(root, _, { models }) {
      return models.PoliticalView.findAll({});
    },
  },

  Mutation: {
    async createPoliticalView(_, { name }, { models }) {
      try {
        return await models.PoliticalView.create({
          id: await uuidv4(),
          name,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async updatePoliticalView(_, { id, name }, { models }) {
      try {
        const politicalView = await models.PoliticalView.findByPk(id);

        if (!politicalView) {
          throw new Error(`Couldn’t find political view with id ${id}`);
        }

        politicalView.name = name;
        await politicalView.save();

        return politicalView;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async deletePoliticalView(_, { id }, { models }) {
      try {
        const rowsDeleted = await models.PoliticalView.destroy({
          where: { id },
        });

        return {
          rowsDeleted,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
