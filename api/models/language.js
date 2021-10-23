const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: 'UserLanguages',
        sourceKey: 'id',
        foreignKey: 'languageId',
        as: '_languages',
      });
    }
  }

  Language.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Language',
    }
  );
  return Language;
};
