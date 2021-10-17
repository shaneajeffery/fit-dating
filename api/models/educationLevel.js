const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EducationLevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
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
