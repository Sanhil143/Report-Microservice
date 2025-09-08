import { Application } from "express";
import reportRouter from "./api/routes/report.route";

export default function routes(app: Application): void {
  app.use("/report/api/v1/auth", reportRouter);
}
