const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection.js");
const User = require("./user");
const Song = require("./song");

class Post extends Model {}

Post.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Song, key: "id" },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    comment: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    modelName: "post",
    timestamps: true, // to track createdAt and updatedAt
    freezeTableName: true,
  }
);

Post.belongsTo(User, { foreignKey: "userId" });
Post.belongsTo(Song, { foreignKey: "songId" });

module.exports = Post;
