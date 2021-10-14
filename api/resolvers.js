const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    async getUser(root, { id }, { models }) {
      return models.User.findByPk(id);
    },
    async listUsers(root, _, { models }) {
      return models.User.findAll({});
    },
  },

  Mutation: {
    async createUser(
      root,
      { name, email, password, phone, dateOfBirth, zipCode },
      { models }
    ) {
      return models.User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        phone,
        dateOfBirth,
        zipCode,
      });
    },
  },
};

module.exports = resolvers;
