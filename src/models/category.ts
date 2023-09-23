import * as Sequelize from "sequelize";
import { VehicleCategoryModelInterface } from "../interfaces";
import { Database } from "./instance";
import Vehicle from "./vehicle";
const sequelize = Database.sequelize;

const Category = sequelize.define<VehicleCategoryModelInterface>(
  "categories",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
      field: "name",
    },
    row: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "row",
    },
    column: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "column",
    },
    description:{
      type: Sequelize.STRING(50),
      allowNull: false,
      field: "description",
    }
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);


Vehicle.belongsTo(Category,{
  foreignKey:"categoryId",
  as:"category"
})

Category.hasMany(Vehicle,{
  foreignKey:"categoryId",
  as:"vehicles"
})

export default Category;
