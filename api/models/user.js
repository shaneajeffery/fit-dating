const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.Gender, {
        sourceKey: 'gender',
        foreignKey: 'id',
        as: '_gender',
      });

      this.belongsToMany(models.Activity, {
        through: 'UserActivities',
        sourceKey: 'id',
        foreignKey: 'userId',
        as: '_activities',
      });

      this.belongsToMany(models.DietaryInterest, {
        through: 'UserDietaryInterests',
        sourceKey: 'id',
        foreignKey: 'userId',
        as: '_dietaryInterests',
      });

      this.belongsToMany(models.Language, {
        through: 'UserLanguages',
        sourceKey: 'id',
        foreignKey: 'userId',
        as: '_languages',
      });

      this.belongsToMany(models.Ethnicity, {
        through: 'UserEthnicities',
        sourceKey: 'id',
        foreignKey: 'userId',
        as: '_ethnicities',
      });
    }
  }

  User.init(
    {
      firstName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      dateOfBirth: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      gender: DataTypes.UUID,
      lastLogin: DataTypes.DATE,
      stytchUserId: DataTypes.STRING,
      stytchPhoneId: DataTypes.STRING,
      finishedOnboarding: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
