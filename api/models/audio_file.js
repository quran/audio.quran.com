'use strict';
module.exports = function(sequelize, DataTypes) {
  var AudioFile = sequelize.define('audioFile', {
    qari_id: DataTypes.INTEGER,
    sura_number: DataTypes.INTEGER,
    filenum: DataTypes.INTEGER,
    file_name: DataTypes.STRING,
    extension: DataTypes.STRING,
    stream_count: DataTypes.INTEGER,
    download_count: DataTypes.INTEGER
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    tableName: 'audio_files',
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.qari, {foreignKey: 'qari_id'});
        this.belongsTo(models.surah, {foreignKey: 'sura_number'});
      }
    }
  });
  return AudioFile;
};
