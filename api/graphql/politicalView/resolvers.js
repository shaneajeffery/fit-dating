module.exports = {
  Query: {
    async getPoliticalView(root, { id }, { models }) {
      return models.PoliticalView.findByPk(id);
    },
    async listPoliticalViews(root, _, { models }) {
      return models.PoliticalView.findAll({});
    },
  },

  // Will need to create mutations for create, update, delete.

  Mutation: {},
};
