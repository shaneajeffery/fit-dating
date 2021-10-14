import { Dialect } from "sequelize/types";

export default {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "prototype",
  PORT: 5433,
  dialect: "mysql" as Dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};