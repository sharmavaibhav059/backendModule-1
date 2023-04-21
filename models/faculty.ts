import {
    DataTypes, InferAttributes, InferCreationAttributes, Model,
  } from "sequelize";
  
  import sequelize from "./indexModels";
import Research from "./research";
import User from "./user";
  const Faculty=sequelize.define(
    'Faculty',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
      },
      phone: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName:"faculties",
    }
  );
// Faculty.hasMany(Research)
Faculty.belongsTo(User,{foreignKey:"userId",foreignKeyConstraint:true,as:"users"});

  (async()=>{
    try {
      await Faculty.sync()
      console.log("faculty table (re)created");
    } catch (error) {
      console.log(error);
    }
  })()
  
  export default Faculty;
  