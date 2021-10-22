const { v4: uuidv4 } = require('uuid');

module.exports = {
  Query: {
    async getLanguage(root, { id }, { models }) {
      return models.Language.findByPk(id);
    },
    async listLanguages(root, _, { models }) {
      return models.Language.findAll({});
    },
  },

  Mutation: {
    async createLanguage(_, { name }, { models }) {
      try {
        return await models.Language.create({
          id: await uuidv4(),
          name,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async updateLanguage(_, { id, name }, { models }) {
      try {
        const language = await models.Language.findByPk(id);

        if (!language) {
          throw new Error(`Couldn’t find language with id ${id}`);
        }

        language.name = name;
        await language.save();

        return language;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async deleteLanguage(_, { id }, { models }) {
      try {
        const rowsDeleted = await models.Language.destroy({
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
