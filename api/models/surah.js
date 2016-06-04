'use strict';
module.exports = function(sequelize, DataTypes) {
  var Surah = sequelize.define('surah', {
    number: {type: DataTypes.INTEGER, primaryKey: true},
    name: DataTypes.STRING,
    arabic_name: DataTypes.STRING
  }, {
    timestamps: false,
    paranoid: true,
    tableName: 'surahs',
    classMethods: {
      associate: function(models) {
        this.hasMany(models.audioFile, {foreignKey: 'sura_number'});
        this.belongsToMany(models.qari, {through: models.audioFile, foreignKey: 'qari_id'});
      }
    }
  });
  return Surah;
};
