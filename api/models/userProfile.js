const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    static associate(models) {
      this.hasOne(models.Religion, {
        sourceKey: 'religion',
        foreignKey: 'id',
        as: '_religion',
      });

      this.hasOne(models.PoliticalView, {
        sourceKey: 'politicalView',
        foreignKey: 'id',
        as: '_politicalView',
      });

      this.hasOne(models.RelationshipStatus, {
        sourceKey: 'relationshipStatus',
        foreignKey: 'id',
        as: '_relationshipStatus',
      });

      this.hasOne(models.EducationLevel, {
        sourceKey: 'educationLevel',
        foreignKey: 'id',
        as: '_educationLevel',
      });
    }
  }
  UserProfile.init(
    {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      job: DataTypes.STRING,
      height: DataTypes.STRING,
      hometown: DataTypes.STRING,
      haveKids: DataTypes.BOOLEAN,
      wantKids: DataTypes.BOOLEAN,
      religion: DataTypes.UUID,
      politicalView: DataTypes.UUID,
      relationshipStatus: DataTypes.UUID,
      educationLevel: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'UserProfile',
    }
  );

  return UserProfile;
};
