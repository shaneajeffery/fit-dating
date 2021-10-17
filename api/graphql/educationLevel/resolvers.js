module.exports = {
  Query: {
    async getEducationlevel(root, { id }, { models }) {
      return models.EducationLevel.findByPk(id);
    },
    async listEducationLevels(root, _, { models }) {
      return models.EducationLevel.findAll({});
    },
  },

  // Will need to create mutations for create, update, delete.

  Mutation: {},
};
