const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Op = require('Sequelize').Op;

module.exports = {
  Query: {
    async getUser(root, { id }, { models }) {
      const data = await models.User.findByPk(id, {
        include: [
          {
            model: models.Gender,
            as: '_gender',
          },
        ],
      });

      console.log(data);

      return data;
    },
    async listUsers(root, _, { models }) {
      return await models.User.findAll({
        include: [
          {
            model: models.Gender,
            as: '_gender',
          },
        ],
      });
    },
  },

  Mutation: {
    async createUser(
      _,
      { username, email, password, phone, dateOfBirth, zipCode, gender },
      { models }
    ) {
      try {
        // Checks to make sure that an account does not already exist with
        // either the entered email or username.
        const preExistingUser = await models.User.findOne({
          where: {
            [Op.or]: [
              {
                email: {
                  [Op.eq]: email,
                },
              },
              {
                username: {
                  [Op.eq]: username,
                },
              },
            ],
          },
        });

        if (preExistingUser) {
          throw new Error('An account already exists with that e-mail.');
        }

        const user = models.User.create({
          id: await uuidv4(),
          username,
          email,
          password: await bcrypt.hash(password, 10),
          phone,
          dateOfBirth,
          zipCode,
          gender,
        });

        const token = jsonwebtoken.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1y' }
        );

        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async login(_, { email, password }, { models }) {
      try {
        const user = await models.User.findOne({ where: { email } });
        if (!user) {
          throw new Error(
            'No account with that e-mail / password combination.'
          );
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error(
            'No account with that e-mail / password combination.'
          );
        }

        const token = jsonwebtoken.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );

        return {
          token,
          user: {
            ...user.dataValues,
            password: '',
          },
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
