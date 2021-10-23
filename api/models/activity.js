const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: 'UserActivities',
        sourceKey: 'id',
        foreignKey: 'activityId',
        as: '_activities',
      });
    }
  }

  Activity.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Activity',
    }
  );
  return Activity;
};
