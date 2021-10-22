const { v4: uuidv4 } = require('uuid');

module.exports = {
  Query: {
    async getRelationshipStatus(root, { id }, { models }) {
      return models.RelationshipStatus.findByPk(id);
    },
    async listRelationshipStatuses(root, _, { models }) {
      return models.RelationshipStatus.findAll({});
    },
  },

  Mutation: {
    async createRelationshipStatus(_, { name }, { models }) {
      try {
        return await models.RelationshipStatus.create({
          id: await uuidv4(),
          name,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async updateRelationshipStatus(_, { id, name }, { models }) {
      try {
        const relationshipStatus = await models.RelationshipStatus.findByPk(id);

        if (!relationshipStatus) {
          throw new Error(`Couldn’t find relationship status with id ${id}`);
        }

        relationshipStatus.name = name;
        await relationshipStatus.save();

        return relationshipStatus;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async deleteRelationshipStatus(_, { id }, { models }) {
      try {
        const rowsDeleted = await models.RelationshipStatus.destroy({
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
