import Database from "better-sqlite3";
import { PanicAlertModel, PanicAlertStats } from "../models/PanicAlertModel";
import fixtures from "./fixtures.json";
import { ResponderModel } from "../models/ResponderModel";

const db = new Database("app.db");

const dropPanicAlertsTable = "DROP TABLE IF EXISTS PanicAlerts";
const dropRespondersTable = "DROP TABLE IF EXISTS Responders";

db.exec(dropPanicAlertsTable);
db.exec(dropRespondersTable);

const createPanicAlertTable = `
  CREATE TABLE panicAlerts (
    id INTEGER PRIMARY KEY,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    createdAt STRING NOT NULL,
    updatedAt STRING NOT NULL,
    status STRING NOT NULL,
    userId INTEGER NOT NULL,
    userFullName STRING NOT NULL,
    userContact INTEGER NOT NULL,
    responderId INTEGER
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
    vehicleInfo STRING NOT NULL,
    serviceType STRING NOT NULL
  )
`;

db.exec(createPanicAlertTable);
db.exec(createRespondersTable);

export const insertPanicAlert = (alert: PanicAlertModel) => {
  const insertPanicAlertQuery = db.prepare(`INSERT INTO panicAlerts (
      latitude, longitude, status, createdAt, updatedAt, userId, userFullName, userContact, responderId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  insertPanicAlertQuery.run(
    alert.latitude,
    alert.longitude,
    alert.status.toString(),
    alert.createdAt,
    alert.updatedAt,
    alert.userId,
    alert.userFullName,
    alert.userContact,
    alert.responderId
  );
};

fixtures.panicAlertData.forEach((data: PanicAlertModel) => {
  insertPanicAlert(data);
});

export const insertResponderAlert = (responder: ResponderModel) => {
  const insertResponderQuery = db.prepare(`INSERT INTO responders (
      company, contact, companyContact, email, latitude, longitude,  vehicleInfo, serviceType 
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

  insertResponderQuery.run(
    responder.company,
    responder.contact,
    responder.companyContact,
    responder.email,
    responder.latitude,
    responder.longitude,
    responder.vehicleInfo,
    responder.serviceType
  );
};

fixtures.responderData.forEach((data: ResponderModel) => {
  insertResponderAlert(data);
});

export const patchPanicAlert = (alert: PanicAlertModel) => {
  const updatePanicAlertQuery = db.prepare(
    `UPDATE panicAlerts SET latitude = ?, longitude = ?, status = ?, createdAt = ?, updatedAt = ?, userId = ?,  userFullName = ?, userContact = ?, responderId = ? WHERE id = ?`
  );

  updatePanicAlertQuery.run(
    alert.latitude,
    alert.longitude,
    alert.status,
    alert.createdAt,
    alert.updatedAt,
    alert.userId,
    alert.userFullName,
    alert.userContact,
    alert.responderId,
    alert.id
  );
};

export const getPanicAlertById = (id: number): PanicAlertModel => {
  const alert = db.prepare("SELECT * FROM panicAlerts WHERE id=?").get(id);

  return alert as PanicAlertModel;
};

export const getUnresolvedPanicAlerts = (): PanicAlertModel[] => {
  const alerts = db
    .prepare("SELECT * FROM panicAlerts WHERE status IN ('NEW', 'ASSIGNED')")
    .all();

  return alerts as PanicAlertModel[];
};

export const getResponderById = (id: number): ResponderModel => {
  const responder = db.prepare("SELECT * FROM responders WHERE id=?").get(id);

  return responder as ResponderModel;
};

export const getAllResponders = (): ResponderModel[] => {
  const responder = db.prepare("SELECT * FROM responders").all();

  return responder as ResponderModel[];
};

export const getLatestAlertsByUserId = (userId: number): PanicAlertModel[] => {
  const alerts = db
    .prepare("SELECT * from panicAlerts where userId = ?")
    .all(userId);

  return alerts as PanicAlertModel[];
};

type Count = {
  count: number;
};
export const getStats = (): PanicAlertStats => {
  const totalNewAlerts = db
    .prepare("SELECT COUNT(*) count FROM panicAlerts WHERE status = 'NEW'")
    .get() as Count;

  const totalActiveAlerts = db
    .prepare("SELECT COUNT(*) count FROM panicAlerts WHERE status ='ASSIGNED'")
    .get() as Count;

  const today = new Date().toISOString().split("T")[0];

  const totalAlertsToday = db
    .prepare(
      "SELECT COUNT(*) count FROM panicAlerts WHERE strftime('%Y-%m-%d', createdAt) = ?"
    )
    .get(today) as Count;

  const closedTodayAlerts = db
    .prepare(
      "SELECT COUNT(*) count FROM panicAlerts WHERE status = 'RESOLVED' AND strftime('%Y-%m-%d', updatedAt) = ?"
    )
    .get(today) as Count;

  return {
    totalNewAlerts: totalNewAlerts.count,
    totalActiveAlerts: totalActiveAlerts.count,
    closedTodayAlerts: closedTodayAlerts.count,
    totalAlertsToday: totalAlertsToday.count,
  };
};

// db.close()
