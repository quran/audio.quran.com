module.exports = (sequelize, DataTypes) => {
  const Qari = sequelize.define(
    'qari',
    {
      name: DataTypes.STRING,
      arabic_name: DataTypes.STRING,
      relative_path: DataTypes.STRING,
      file_formats: DataTypes.STRING,
      section_id: DataTypes.INTEGER,
      home: DataTypes.BOOLEAN,
      description: DataTypes.TEXT,
      torrent_filename: DataTypes.STRING,
      torrent_info_hash: DataTypes.STRING,
      torrent_seeders: DataTypes.INTEGER,
      torrent_leechers: DataTypes.INTEGER
    },
    {
      timestamps: false,
      paranoid: true,
      tableName: 'qaris',
      underscored: true,
      classMethods: {
        associate(models) {
          this.hasMany(models.audioFile, { foreignKey: 'qari_id' });
          this.belongsToMany(models.surah, {
            through: models.audioFile,
            foreignKey: 'surah_id'
          });
          this.belongsTo(models.section);
          this.belongsToMany(models.recitation, { through: models.audioFile });
        }
      }
    }
  );
  return Qari;
};
