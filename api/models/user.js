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
    }
  }

  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      dateOfBirth: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      gender: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
