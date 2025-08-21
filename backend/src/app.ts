import express, { Request, Response } from "express";
import { PanicAlertService } from "./modules/panic-alert/panic-alert.service";
import cors from "cors";
import ResponderService from "./modules/responder/responder.service";
import errorHandler from "./middleware/error-handler";

export const app = express();
const port = 3000;

const panicAlertService = new PanicAlertService();
const responderService = new ResponderService();

app.use(express.json());
app.use(cors());

app.post("/panic-alerts", (req, res) => {
  panicAlertService.addPanicAlert(req.body);
  res.send({
    status: 200,
  });
});

app.get("/panic-alerts", (req, res) => {
  const response = panicAlertService.fetchPanicAlerts();
  res.json(response);
});

app.get(`/panic-alerts/:alertId`, (req, res) => {
  const alertId = req.params.alertId;
  const response = panicAlertService.getPanicAlertDetails(parseInt(alertId));
  res.json(response);
});

app.put("/panic-alerts", (req: Request, res: Response) => {
  const response = panicAlertService.updatePanicAlert(req.body);
  res.send({
    status: 200,
    body: response,
  });
});

app.get(`/responders`, (req, res) => {
  const response = responderService.fetchAllResponders();
  res.json(response);
});

app.get("/panic-alerts-stats", (req, res) => {
  const response = panicAlertService.fetchPanicAlertsStats();
  res.json(response);
});

app.use(errorHandler);

if (process.env["NODE_ENV"] !== "test") {
  app.listen(port, () => {
    console.info(`Server running at http://localhost:${port}`);
  });
}
