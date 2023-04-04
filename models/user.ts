import {
  DataTypes, InferAttributes, InferCreationAttributes, Model,
} from "sequelize";
import Faculty from "./faculty";

import sequelize from "./indexModels";

// class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
//   // otherpublicfeild;
// }
const User=sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName:"users",
  }
);

(async()=>{
  try {
    await User.sync()
    console.log("User table (re)created");
  } catch (error) {
    console.log(error);
  }
})()

export default User;
