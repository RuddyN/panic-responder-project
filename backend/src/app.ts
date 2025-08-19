import express from "express";
import { PanicAlertService } from "./modules/panic-alert/panic-alert.service";
import { UserService } from "./modules/users/user.service";
import cors from "cors";
import ResponderService from "./modules/responder/responder.service";

export const app = express();
const port = 3000;

const panicAlertService = new PanicAlertService();
const userService = new UserService();
const responderService = new ResponderService()

app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  const users = userService.fetchUsers();
  res.json({ users });
});

//TODO handle errors

app.post("/panic-alerts", (req, res) => {
  try {
    panicAlertService.addPanicAlert(req.body);
    res.send({
      status: 200,
    });
  } catch (error) {
    console.error(
      `something went wrong while calling the alert service ${error}`
    );
  }
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

app.put("/panic-alerts", (req, res) => {
  const response = panicAlertService.updatePanicAlert(req.body);
  res.send({
    status: 200,
    body: response,
  });
});

app.get(`/responders`, (req, res) => {
  const response = responderService.fetchAllResponders()
  res.json(response);
});

if (process.env["NODE_ENV"] !== "test") {
  app.listen(port, () => {
    console.info(`Server running at http://localhost:${port}`);
  });
}
