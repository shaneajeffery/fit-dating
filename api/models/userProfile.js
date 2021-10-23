const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Religion, {
        sourceKey: 'religion',
        foreignKey: 'id',
        as: '_religion',
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
    },
    {
      sequelize,
      modelName: 'UserProfile',
    }
  );
  return UserProfile;
};
