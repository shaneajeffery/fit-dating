module.exports = {
  Query: {
    async getGender(root, { id }, { models }) {
      return models.Gender.findByPk(id);
    },
    async listGenders(root, _, { models }) {
      return models.Gender.findAll({});
    },
  },

  // Will need to create mutations for create, update, delete.

  Mutation: {},
};
