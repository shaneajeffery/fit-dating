// const bcrypt = require('bcryptjs');
// const jsonwebtoken = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');
// const Op = require('Sequelize').Op;

module.exports = {
  Query: {
    async getUserProfile(root, { userId }, { models }) {
      const data = await models.UserProfile.findOne({
        where: { userId },
        include: [
          {
            model: models.Religion,
            as: '_religion',
          },
          {
            model: models.PoliticalView,
            as: '_politicalView',
          },
          {
            model: models.RelationshipStatus,
            as: '_relationshipStatus',
          },
          {
            model: models.EducationLevel,
            as: '_educationLevel',
          },
        ],
      });

      return data;
    },
  },

  Mutation: {
    async createUserProfile(
      _,
      {
        userId,
        job,
        height,
        hometown,
        religion,
        politicalView,
        relationshipStatus,
        educationLevel,
        haveKids,
        wantKids,
      },
      { models }
    ) {
      try {
        return await models.UserProfile.create({
          userId,
          job,
          height,
          hometown,
          religion,
          politicalView,
          relationshipStatus,
          educationLevel,
          haveKids,
          wantKids,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async updateUserProfile(
      _,
      {
        userId,
        job,
        height,
        hometown,
        religion,
        politicalView,
        relationshipStatus,
        educationLevel,
        haveKids,
        wantKids,
      },
      { models }
    ) {
      try {
        const userProfile = await models.UserProfile.findByPk(userId);

        if (!userProfile) {
          throw new Error(`Couldn’t find user profile with userId ${userId}`);
        }

        userProfile.job = job;
        userProfile.height = height;
        userProfile.hometown = hometown;
        userProfile.religion = religion;
        userProfile.politicalView = politicalView;
        userProfile.relationshipStatus = relationshipStatus;
        userProfile.educationLevel = educationLevel;
        userProfile.haveKids = haveKids;
        userProfile.wantKids = wantKids;

        await userProfile.save();

        return userProfile;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
