import "dotenv/config";
import knex from "knex";
import PQueue from "p-queue";

export const url3 = process.env.API_URL_3;

export const url4 = process.env.API_URL_4;

export const log = (data) =>
  `${console.log(JSON.stringify(data, null, 2))}\n\n`;

const getIntro = (str) => str.split(".")[0];

const connection4 = process.env.DB_CONNECTION_4;

export const db = knex({
  client: "pg",
  connection: connection4,
});

export const queue = new PQueue({ concurrency: 16 });
