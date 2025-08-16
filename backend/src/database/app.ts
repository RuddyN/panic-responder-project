import Database from "better-sqlite3";
import { UserModel } from "../models/UserModel";
import { PanicAlertModel } from "../models/PanicAlertModel";

const db = new Database("app.db");

const dropPanicAlertsTable = "DROP TABLE IF EXISTS PanicAlerts";
const dropUserTable = "DROP TABLE IF EXISTS Users";
const dropRespondersTable = "DROP TABLE IF EXISTS Responders";

db.exec(dropPanicAlertsTable);
db.exec(dropUserTable);
db.exec(dropRespondersTable);

const createPanicAlertTable = `
  CREATE TABLE PanicAlerts (
    id INTEGER PRIMARY KEY,
    location STRING NOT NULL,
    status STRING NOT NULL,
    userId INTEGER NOT NULL,
    responderId INTEGER
  )
`;

const createUserTable = `
 CREATE TABLE Users (
    id INTEGER PRIMARY KEY,
    fullName STRING NOT NULL,
    contact INTEGER NOT NULL,
    email STRING NOT NULL,
    physicalAddress STRING NOT NULL,
    emergencyContact INTEGER NOT NULL
  )
`;

const createRespondersTable = `
 CREATE TABLE Responders (
    id INTEGER PRIMARY KEY,
    company STRING NOT NULL,
    contact INTEGER NOT NULL,
    email STRING NOT NULL,
    physicalAddress STRING,
    serviceType STRING NOT NULL
  )
`;

db.exec(createPanicAlertTable);
db.exec(createUserTable);
db.exec(createRespondersTable);

export const insertUser = (user: UserModel) => {
  const insertUserQuery = db.prepare(`INSERT INTO Users (
      fullName, contact, email, physicalAddress, emergencyContact
    ) VALUES (?, ?, ?, ?, ?)`);

  insertUserQuery.run(
    user.fullName,
    user.contact,
    user.email,
    user.physicalAddress,
    user.emergencyContact
  );
};

export const insertPanicAlert = (alert: PanicAlertModel) => {
  const insertPanicAlertQuery = db.prepare(`INSERT INTO PanicAlerts (
      location, status, userId
    ) VALUES (?, ?, ?, ?, ?)`);

  insertPanicAlertQuery.run(alert.location, alert.status, alert.userId);
};

export const patchPanicAlert = (alert: PanicAlertModel) => {
  const updatePanicAlertQuery = db.prepare(
    `UPDATE PanicAlerts SET location = ?, status = ?, responderId = ? WHERE id = ?`
  );

  updatePanicAlertQuery.run(
    alert.location,
    alert.status,
    alert.responderId,
    alert.id
  );
};

export const getUserById = (id: number) => {
  const user = db.prepare("SELECT * FROM Users WHERE id=?").get(id);

  return user;
};

export const getPanicAlertById = (id: number) => {
  const alert = db.prepare("SELECT * FROM PanicAlerts WHERE id=?").get(id);

  return alert;
};

// db.close()
