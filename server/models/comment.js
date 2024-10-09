import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection.js";
import User from "./user.js";
import Post from "./post.js";

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

export default Comment;
