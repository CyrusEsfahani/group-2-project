const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection.js");

class Song extends Model {}

Song.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    songId: { type: DataTypes.STRING, allowNull: false }, // external song id
    trackName: { type: DataTypes.STRING, allowNull: false },
    artistName: { type: DataTypes.STRING, allowNull: false },
    albumName: { type: DataTypes.STRING, allowNull: true },
    imageUrl: { type: DataTypes.STRING, allowNull: true },
    playerUri: { type: DataTypes.STRING, allowNull: true }, // e.g., Spotify URI
  },
  {
    sequelize,
    modelName: "song",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Song;