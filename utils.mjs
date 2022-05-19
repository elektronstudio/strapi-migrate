import "dotenv/config";
import knex from "knex";
import PQueue from "p-queue";

export const url3 = process.env.API_URL_3;

export const url4 = process.env.API_URL_4;

export const log = (data) =>
  `${console.log(JSON.stringify(data, null, 2))}\n\n`;

export const getIntro = (str = "") => (str ? str.split(".")[0] : null);

const connection4 = process.env.DB_CONNECTION_4;

export const db = knex({
  client: "pg",
  connection: connection4,
});

export const queue = new PQueue({ concurrency: 16 });

export const singleQueue = new PQueue({ concurrency: 1 });

export const getFormat = (obj, format) => {
  if (obj[format]) return obj[format];
  if (!obj[format] && format === "large" && obj.medium) {
    return obj.medium;
  }
  if (!obj[format] && format === "large" && obj.small) {
    return obj.small;
  }
  if (!obj[format] && format === "medium" && obj.small) {
    return obj.small;
  }
  if (!obj[format] && format === "thumbnail" && obj.small) return obj.small;
  if (!obj.large && !obj.medium && !obj.small && obj.thumbnail) {
    return obj.thumbnail;
  }
  return null;
};
