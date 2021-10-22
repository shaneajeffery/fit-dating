const { v4: uuidv4 } = require('uuid');

module.exports = {
  Query: {
    async getEthnicity(root, { id }, { models }) {
      return models.Ethnicity.findByPk(id);
    },
    async listEthnicities(root, _, { models }) {
      return models.Ethnicity.findAll({});
    },
  },

  Mutation: {
    async createEthnicity(_, { name }, { models }) {
      try {
        return await models.Ethnicity.create({
          id: await uuidv4(),
          name,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async updateEthnicity(_, { id, name }, { models }) {
      try {
        const ethnicity = await models.Ethnicity.findByPk(id);

        if (!ethnicity) {
          throw new Error(`Couldn’t find ethnicity with id ${id}`);
        }

        ethnicity.name = name;
        await ethnicity.save();

        return ethnicity;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async deleteEthnicity(_, { id }, { models }) {
      try {
        const rowsDeleted = await models.Ethnicity.destroy({
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
