import express from "express";
import { PanicAlertService } from "./modules/panic-alert/panic-alert.service";
import { UserService } from "./modules/users/user.service";

export const app = express();
const port = 3000;

const panicAlertService = new PanicAlertService();
const userService = new UserService();

app.use(express.json());

app.get("/users", (req, res) => {
  const users = userService.fetchUsers();
  res.json({ users });
});

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
  res.json({ alerts: response });
});

if (process.env["NODE_ENV"] !== "test") {
  app.listen(port, () => {
    console.info(`Server running at http://localhost:${port}`);
  });
}
