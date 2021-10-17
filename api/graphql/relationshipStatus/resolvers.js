module.exports = {
  Query: {
    async getRelationshipStatus(root, { id }, { models }) {
      return models.RelationshipStatus.findByPk(id);
    },
    async listRelationshipStatuses(root, _, { models }) {
      return models.RelationshipStatus.findAll({});
    },
  },

  // Will need to create mutations for create, update, delete.

  Mutation: {},
};
