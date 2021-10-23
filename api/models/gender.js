const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        sourceKey: 'gender',
        foreignKey: 'id',
      });
    }
  }
  Gender.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Gender',
    }
  );
  return Gender;
};
