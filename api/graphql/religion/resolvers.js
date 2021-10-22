const { v4: uuidv4 } = require('uuid');

module.exports = {
  Query: {
    async getReligion(root, { id }, { models }) {
      return models.Religion.findByPk(id);
    },
    async listReligions(root, _, { models }) {
      return models.Religion.findAll({});
    },
  },

  Mutation: {
    async createReligion(_, { name }, { models }) {
      try {
        return await models.Religion.create({
          id: await uuidv4(),
          name,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async updateReligion(_, { id, name }, { models }) {
      try {
        const religion = await models.Religion.findByPk(id);

        if (!religion) {
          throw new Error(`Couldn’t find religion with id ${id}`);
        }

        religion.name = name;
        await religion.save();

        return religion;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async deleteReligion(_, { id }, { models }) {
      try {
        const rowsDeleted = await models.Religion.destroy({
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
