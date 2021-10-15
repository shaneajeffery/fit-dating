module.exports = {
  Query: {
    async getDietaryInterest(root, { id }, { models }) {
      return models.DietaryInterest.findByPk(id);
    },
    async listDietaryInterests(root, _, { models }) {
      return models.DietaryInterest.findAll({});
    },
  },

  // Will need to create mutations for create, update, delete.

  Mutation: {},
};
