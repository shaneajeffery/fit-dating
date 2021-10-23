const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ethnicity extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: 'UserEthnicities',
        sourceKey: 'id',
        foreignKey: 'ethnicityId',
        as: '_ethnicities',
      });
    }
  }

  Ethnicity.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Ethnicity',
    }
  );
  return Ethnicity;
};
