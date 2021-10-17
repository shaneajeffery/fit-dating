module.exports = {
  Query: {
    async getReligion(root, { id }, { models }) {
      return models.Religion.findByPk(id);
    },
    async listReligions(root, _, { models }) {
      return models.Religion.findAll({});
    },
  },

  // Will need to create mutations for create, update, delete.

  Mutation: {},
};
