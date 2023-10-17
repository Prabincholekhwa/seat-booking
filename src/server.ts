import bodyParser from "body-parser";
import path from "path";
import fs from 'fs';
import cors, { CorsOptions } from "cors";
import express, { Application } from "express";
import http from "http";
import { corsWhitelist } from "./config";
import { Database } from "./models/instance";
import { ProxyRouter as ProxyRouterPublic } from "./routes/public";
import swaggerUI from "swagger-ui-express";
import { optionsSwaggerUI, swaggerSpec } from "./utils";
import cookieParser from "cookie-parser";
require('dotenv').config();


class App {
  private app: Application;
  private server: http.Server;

  constructor() {
    this.app = express();
    this.server = new http.Server(this.app);

    this.configuration();
  }

  private configuration() {
    this.app.set("port", process.env.PORT);
    this.app.use(express.json());
    this.app.use(cors(this.corsOptions));
    this.app.use(cookieParser(process.env.PRIVATE_KEY));
    this.app.use("/api/v1", ProxyRouterPublic.map());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.get("/swagger.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
    this.app.use("/swagger", swaggerUI.serve);
    this.app.get(
      "/swagger",
      swaggerUI.setup(swaggerSpec, optionsSwaggerUI)
    );
  }

  private corsOptions: CorsOptions = {
    origin: function (origin, callback) {
      if (!origin || corsWhitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
    credentials: true,
  };

  private async connectDB() {
    await Database.connection();
  }

  public Start() {
    this.connectDB();
    this.server.listen(this.app.get("port"));
    console.log(`Server listening on port ${this.app.get("port")}.`);
  }
}

new App().Start();
