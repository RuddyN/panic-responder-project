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
  CREATE TABLE panicAlerts (
    id INTEGER PRIMARY KEY,
    location STRING NOT NULL,
    status STRING NOT NULL,
    userId INTEGER NOT NULL,
    responderId INTEGER
  )
`;

const createUserTable = `
 CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    fullName STRING NOT NULL,
    contact INTEGER NOT NULL,
    email STRING NOT NULL,
    physicalAddress STRING NOT NULL,
    emergencyContact INTEGER NOT NULL
  )
`;

const createRespondersTable = `
 CREATE TABLE responders (
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
  const insertUserQuery = db.prepare(`INSERT INTO users (
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

const userData = [
  {
    fullName: "John Doe",
    contact: +275674329988,
    email: "john@test.com",
    physicalAddress: "13 Avenue",
    emergencyContact: +275674329988,
  },
  {
    fullName: "Peter Pan",
    contact: +275674329988,
    email: "peter@test.com",
    physicalAddress: "15 Avenue",
    emergencyContact: +275674329988,
  },
  {
    fullName: "Harry Potter",
    contact: +275674529988,
    email: "harry@test.com",
    physicalAddress: "14 Avenue",
    emergencyContact: +275674669988,
  },
];

userData.forEach((data) => {
  insertUser(data);
});

export const getAllUsers = () => {
  const users = db.prepare("SELECT * FROM users").all();

  return users;
};

export const insertPanicAlert = (alert: PanicAlertModel) => {
  const insertPanicAlertQuery = db.prepare(`INSERT INTO panicAlerts (
      location, status, userId
    ) VALUES (?, ?, ?)`);

  insertPanicAlertQuery.run(alert.location, alert.status, alert.userId);
};

export const patchPanicAlert = (alert: PanicAlertModel) => {
  const updatePanicAlertQuery = db.prepare(
    `UPDATE panicAlerts SET location = ?, status = ?, responderId = ? WHERE id = ?`
  );

  updatePanicAlertQuery.run(
    alert.location,
    alert.status,
    alert.responderId,
    alert.id
  );
};

export const getUserById = (id: number) => {
  const user = db.prepare("SELECT * FROM users WHERE id=?").get(id);

  return user;
};

export const getPanicAlertById = (id: number) => {
  const alert = db.prepare("SELECT * FROM panicAlerts WHERE id=?").get(id);

  return alert;
};

export const getAllPanicAlerts = () => {
  const alerts = db.prepare("SELECT * FROM panicAlerts").all();
console
  return alerts;
};

// db.close()
