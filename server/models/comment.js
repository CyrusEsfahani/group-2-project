const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection.js");
const User = require("./user");
const Post = require("./post");

class Comment extends Model {}

Comment.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Post, key: "id" },
    },
    content: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    modelName: "comment",
    timestamps: true,
    freezeTableName: true,
  }
);

Comment.belongsTo(User, { foreignKey: "userId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

module.exports = Comment;
