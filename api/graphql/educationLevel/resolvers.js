const { v4: uuidv4 } = require('uuid');

module.exports = {
  Query: {
    async getEducationLevel(root, { id }, { models }) {
      return models.EducationLevel.findByPk(id);
    },
    async listEducationLevels(root, _, { models }) {
      return models.EducationLevel.findAll({});
    },
  },

  Mutation: {
    async createEducationLevel(_, { name }, { models }) {
      try {
        return await models.EducationLevel.create({
          id: await uuidv4(),
          name,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async updateEducationLevel(_, { id, name }, { models }) {
      try {
        const educationLevel = await models.EducationLevel.findByPk(id);

        if (!educationLevel) {
          throw new Error(`Couldn’t find education level with id ${id}`);
        }

        educationLevel.name = name;
        await educationLevel.save();

        return educationLevel;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async deleteEducationLevel(_, { id }, { models }) {
      try {
        const rowsDeleted = await models.EducationLevel.destroy({
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
