import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import Faculty from "./faculty";

import sequelize from "./indexModels";
const Research= sequelize.define(
  "Research",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    researchType:{
      type:DataTypes.STRING,
      allowNull:false
    },
    journalISBNNo:{
        type:DataTypes.NUMBER,
        allowNull:false,
        unique:true
    },
    authorsName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    researchTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    journalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishedYear: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    volNo: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    pageNo: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    researchlink:{
        type:DataTypes.STRING,
    }
  },
  {
    tableName: "researches",
  }
);
Research.belongsTo(Faculty,{foreignKey:"facultyId",foreignKeyConstraint:true,as:"faculty"});
(async () => {
  try {
    await Research.sync();
    console.log("Research table (re)created");
  } catch (error) {
    console.log(error);
  }
})();

export default Research;
