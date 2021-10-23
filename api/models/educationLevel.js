const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EducationLevel extends Model {
    static associate(models) {
      this.belongsTo(models.UserProfile, {
        sourceKey: 'educationLevel',
        foreignKey: 'id',
      });
    }
  }
  EducationLevel.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'EducationLevel',
    }
  );
  return EducationLevel;
};
