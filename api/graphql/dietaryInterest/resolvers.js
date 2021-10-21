const { v4: uuidv4 } = require('uuid');

module.exports = {
  Query: {
    async getDietaryInterest(root, { id }, { models }) {
      return models.DietaryInterest.findByPk(id);
    },
    async listDietaryInterests(root, _, { models }) {
      return models.DietaryInterest.findAll({});
    },
  },

  Mutation: {
    async createDietaryInterest(_, { name }, { models }) {
      try {
        return await models.DietaryInterest.create({
          id: await uuidv4(),
          name,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async updateDietaryInterest(_, { id, name }, { models }) {
      try {
        const dietaryInterest = await models.DietaryInterest.findByPk(id);

        if (!dietaryInterest) {
          throw new Error(`Couldn’t find dietary interest with id ${id}`);
        }

        dietaryInterest.name = name;
        await dietaryInterest.save();

        return dietaryInterest;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async deleteDietaryInterest(_, { id }, { models }) {
      try {
        const rowsDeleted = await models.DietaryInterest.destroy({
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
