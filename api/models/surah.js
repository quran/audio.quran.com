module.exports = (sequelize, DataTypes) => {
  const Surah = sequelize.define(
    'surah',
    {
      surah_id: { type: DataTypes.INTEGER, primaryKey: true },
      ayat: DataTypes.STRING,
      bismillah_pre: DataTypes.BOOLEAN,
      revelation_order: DataTypes.INTEGER,
      revelation_place: DataTypes.STRING,
      page: DataTypes.INTEGER,
      name_complex: DataTypes.STRING,
      name_simple: DataTypes.STRING,
      name_english: DataTypes.STRING,
      name_arabic: DataTypes.STRING
    },
    {
      timestamps: false,
      paranoid: true,
      tableName: 'surahs',
      classMethods: {
        associate: models => {
          this.hasMany(models.audioFile, { foreignKey: 'surah_id' });
          this.belongsToMany(models.qari, {
            through: models.audioFile,
            foreignKey: 'qari_id'
          });
        }
      },

      instanceMethods: {
        revelation() {
          return {
            place: this.revelation_place,
            order: this.revelation_order
          };
        },

        name() {
          return {
            complex: this.name_complex,
            simple: this.name_simple,
            english: this.name_english,
            arabic: this.name_arabic
          };
        },

        toJSON: () => {
          return {
            id: this.surah_id,
            page: this.page,
            bismillah_pre: this.bismillah_pre,
            ayat: this.ayat,
            name: this.name(),
            revelation: this.revelation()
          };
        }
      }
    }
  );

  return Surah;
};
