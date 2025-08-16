import Database from "better-sqlite3";
import UserModel from "../models/UserModel";

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

export const addUser = (user: UserModel) => {
  const insertUser = db.prepare(`INSERT INTO Users (
      fullName, contact, email, physicalAddress, emergencyContact
    ) VALUES (?, ?, ?, ?, ?)`);

  insertUser.run(
    user.fullName,
    user.contact,
    user.email,
    user.physicalAddress,
    user.emergencyContact
  );
};

// db.close()
