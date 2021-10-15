module.exports = {
  Query: {
    async getActivity(root, { id }, { models }) {
      return models.Activity.findByPk(id);
    },
    async listActivities(root, _, { models }) {
      return models.Activity.findAll({});
    },
  },

  // Will need to create mutations for create, update, delete.

  Mutation: {},
};
