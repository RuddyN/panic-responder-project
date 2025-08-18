import Database from "better-sqlite3";
import { UserModel } from "../models/UserModel";
import {
  PanicAlertModel,
  PanicStatus,
  ResponderModel,
} from "../models/PanicAlertModel";
import fixtures from "./fixtures.json";

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
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    location STRING NOT NULL,
    createdAt STRING NOT NULL,
    updatedAt STRING NOT NULL,
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
    companyContact INTEGER NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    location STRING NOT NULL,
    vehicleInfo STRING NOT NULL,
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

fixtures.userData.forEach((data: UserModel) => {
  insertUser(data);
});

export const getAllUsers = () => {
  const users = db.prepare("SELECT * FROM users").all();

  return users;
};

export const insertPanicAlert = (alert: PanicAlertModel) => {
  const insertPanicAlertQuery = db.prepare(`INSERT INTO panicAlerts (
      latitude, longitude, location, status, createdAt, updatedAt, userId, responderId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

  insertPanicAlertQuery.run(
    alert.latitude,
    alert.longitude,
    alert.location,
    alert.status.toString(),
    alert.createdAt,
    alert.updatedAt,
    alert.userId,
    alert.responderId
  );
};

// TODO add a type for this
fixtures.panicAlertData.forEach((data) => {
  insertPanicAlert({ ...data, status: data.status as unknown as PanicStatus });
});

export const insertResponderAlert = (responder: ResponderModel) => {
  const insertResponderQuery = db.prepare(`INSERT INTO responders (
      company, contact, companyContact, email, latitude, longitude, location, vehicleInfo, serviceType 
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  insertResponderQuery.run(
    responder.company,
    responder.contact,
    responder.companyContact,
    responder.email,
    responder.latitude,
    responder.longitude,
    responder.location,
    responder.vehicleInfo,
    responder.serviceType
  );
};

fixtures.responderData.forEach((data) => {
  insertResponderAlert(data);
});

export const patchPanicAlert = (alert: PanicAlertModel) => {
  const updatePanicAlertQuery = db.prepare(
    `UPDATE panicAlerts SET latitude = ?, longitude = ?, location = ?, status = ?, createdAt = ?, updatedAt = ?, userId = ?, responderId = ? WHERE id = ?`
  );

  updatePanicAlertQuery.run(
    alert.latitude,
    alert.longitude,
    alert.location,
    alert.status,
    alert.createdAt,
    alert.updatedAt,
    alert.userId,
    alert.responderId,
    alert.id
  );
};

export const getUserById = (id: number): UserModel => {
  const user = db.prepare("SELECT * FROM users WHERE id=?").get(id);

  return user as UserModel;
};

export const getPanicAlertById = (id: number): PanicAlertModel => {
  const alert = db.prepare("SELECT * FROM panicAlerts WHERE id=?").get(id);

  return alert as PanicAlertModel;
};

export const getAllPanicAlerts = (): PanicAlertModel[] => {
  const alerts = db.prepare("SELECT * FROM panicAlerts").all();

  return alerts as PanicAlertModel[];
};

export const getResponderById = (id: number) => {
  const responder = db.prepare("SELECT * FROM responders WHERE id=?").get(id);

  return responder as ResponderModel;
};

// db.close()
