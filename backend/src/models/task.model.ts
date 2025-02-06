// import { Model, INTEGER, STRING, TEXT, BOOLEAN, DATE } from "@sequelize/core";
// import { Model, INTEGER, STRING, TEXT, BOOLEAN, DATE } from "sequelize";
import { Model, DataTypes } from "@sequelize/core";
import sequelize from "../config/database.js";

export interface TaskAttributes {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type TaskCreationAttributes = Omit<TaskAttributes, "id">;

export interface TaskInstance
  extends Model<TaskAttributes, TaskCreationAttributes>,
    TaskAttributes {}

const Task = sequelize.define<TaskInstance, TaskAttributes>("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    columnName: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    columnName: "updated_at",
  },
});

export default Task;
