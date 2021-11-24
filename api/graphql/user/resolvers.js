const jsonwebtoken = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Op = require('Sequelize').Op;
require('dotenv').config();

const stytch = require('stytch');

const client = new stytch.Client({
  project_id: 'project-test-198ac537-620e-4ebe-8127-30740942759f',
  secret: 'secret-test-rG3xW1afi8mo_9czcYA-GQh3zvK4-gzV--Y=',
  env: stytch.envs.test,
});

module.exports = {
  Query: {
    async getUser(root, { id }, { models }) {
      return await models.User.findByPk(id, {
        include: [
          {
            model: models.Gender,
            as: '_gender',
          },
          {
            model: models.Activity,
            as: '_activities',
          },
          {
            model: models.DietaryInterest,
            as: '_dietaryInterests',
          },
          {
            model: models.Language,
            as: '_languages',
          },
          {
            model: models.Ethnicity,
            as: '_ethnicities',
          },
        ],
      });
    },

    async getUserByStytchId(_, { phoneId, userId }, { models }) {
      console.log('hello world');

      try {
        const data = await models.User.findOne({
          where: {
            [Op.or]: [
              {
                stytchPhoneId: {
                  [Op.eq]: phoneId,
                },
              },
              {
                stytchUserId: {
                  [Op.eq]: userId,
                },
              },
            ],
          },
        });

        console.log(data);

        return data;
      } catch (err) {
        throw new Error(err);
      }
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
    async createJwtToken(_, { userId }) {
      const token = jsonwebtoken.sign({ userId }, process.env.JWT_SECRET);
      return {
        token,
      };
    },

    async requestPhoneVerificationCode(_, { phoneNumber }) {
      const params = {
        phoneNumber: `+1${phoneNumber}`,
      };

      try {
        const response = await client.otps.sms.loginOrCreate(params);

        return {
          phoneId: response.phone_id,
          userId: response.user_id,
          userCreated: response.user_created,
        };
      } catch (err) {
        console.log(err);
      }
    },

    async verifyPhoneVerificationCode(_, { phoneId, code }) {
      const params = {
        method_id: phoneId,
        code,
      };

      try {
        await client.otps.authenticate(params);

        return true;
      } catch (err) {
        throw new Error('Entered phone verification code was invalid.');
      }
    },

    async createUserByPhone(
      _,
      { phone, stytchPhoneId, stytchUserId },
      { models }
    ) {
      try {
        return await models.User.create({
          id: await uuidv4(),
          phone,
          stytchPhoneId,
          stytchUserId,
          finishedOnboarding: false,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // async createUser(
    //   _,
    //   { username, email, password, phone, dateOfBirth, zipCode, gender },
    //   { models }
    // ) {
    //   try {
    //     // Checks to make sure that an account does not already exist with
    //     // either the entered email or username.
    //     const preExistingUser = await models.User.findOne({
    //       where: {
    //         [Op.or]: [
    //           {
    //             email: {
    //               [Op.eq]: email,
    //             },
    //           },
    //           {
    //             username: {
    //               [Op.eq]: username,
    //             },
    //           },
    //         ],
    //       },
    //     });

    //     if (preExistingUser) {
    //       throw new Error('An account already exists with that e-mail.');
    //     }

    //     const user = models.User.create({
    //       id: await uuidv4(),
    //       username,
    //       email,
    //       password: await bcrypt.hash(password, 10),
    //       phone,
    //       dateOfBirth,
    //       zipCode,
    //       gender,
    //     });

    //     const token = jsonwebtoken.sign(
    //       { id: user.id, email: user.email },
    //       process.env.JWT_SECRET,
    //       { expiresIn: '1y' }
    //     );

    //     return {
    //       token,
    //       user,
    //     };
    //   } catch (error) {
    //     throw new Error(error.message);
    //   }
    // },
  },
};
