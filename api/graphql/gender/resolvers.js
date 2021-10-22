const { v4: uuidv4 } = require('uuid');

module.exports = {
  Query: {
    async getGender(root, { id }, { models }) {
      return models.Gender.findByPk(id);
    },
    async listGenders(root, _, { models }) {
      return models.Gender.findAll({});
    },
  },

  Mutation: {
    async createGender(_, { name }, { models }) {
      try {
        return await models.Gender.create({
          id: await uuidv4(),
          name,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async updateGender(_, { id, name }, { models }) {
      try {
        const gender = await models.Gender.findByPk(id);

        if (!gender) {
          throw new Error(`Couldn’t find gender with id ${id}`);
        }

        gender.name = name;
        await gender.save();

        return gender;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async deleteGender(_, { id }, { models }) {
      try {
        const rowsDeleted = await models.Gender.destroy({
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
