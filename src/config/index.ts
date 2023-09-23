import * as dotenv from "dotenv";
import sequelize from "sequelize";
import { EnvironmentEnum, SortEnum } from "../enums";

dotenv.config();


export const port = parseInt(process.env.PORT!) as number,
  appName = process.env.APP_NAME as string,
  hostUrl = process.env.HOST_URL as string,
  environment =
    process.env.ENVIRONMENT || (EnvironmentEnum.development as EnvironmentEnum),
  db = {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    name: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    dialect: process.env.DB_DIALECT!,
    port: parseInt(process.env.DB_PORT!),
    logging: false,
    timezone: "utc",
  } as {
    username: string;
    password: string;
    name: string;
    host: string;
    dialect: sequelize.Dialect;
    port: number;
    logging: boolean;
    timezone: string;
  },
  redisDb = {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
  } as {},
  corsWhitelist = [
    "http://localhost:4000"
  ] as string[],
  /** Pagination */
  pgMinLimit = 10,
  pgMaxLimit = 100,
  /** Order */
  defaultOrder = "createdAt",
  defaultSort = SortEnum.desc