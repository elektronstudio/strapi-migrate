import knex from "knex";
import PQueue from "p-queue";

import { connection4 } from "./utils.mjs";

const db = knex({
  client: "pg",
  connection: connection4,
});

import files from "./data/files.json" assert { type: "json" };

const cdn = (obj) => {
  obj.url = obj.url.replace(
    "fra1.digitaloceanspaces",
    "fra1.cdn.digitaloceanspaces"
  );
  return obj;
};

const getFormat = (obj, format) => {
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

const insertFiles = files.map((f) => {
  f.alternative_text = f.alternativeText || "";
  delete f.alternativeText;
  f.preview_url = f.previewUrl || "";
  delete f.previewUrl;
  f.size = String(f.size);
  f.created_by_id = 1;
  f.updated_by_id = 1;
  delete f.related;
  f.provider = "strapi-provider-upload-do";
  if (f.formats) {
    const ff = f.formats;
    ff.thumbnail = cdn(getFormat(f.formats, "thumbnail"));
    ff.small = cdn(getFormat(f.formats, "small"));
    ff.medium = cdn(getFormat(f.formats, "medium"));
    ff.large = cdn(getFormat(f.formats, "large"));
    f.formats = ff;
  }
  //   if (!f.formats) return 0;
  //   if (!f.formats.large) return 1;
  //   if (!f.formats.medium) return 2;
  //   if (!f.formats.small) return 3;
  //   if (!f.formats.thumbnail) return 4;
  //   return 5;
  return f;
});

// const a = [
//   ff.filter((f) => f === 0).length,
//   ff.filter((f) => f === 1).length,
//   ff.filter((f) => f === 2).length,
//   ff.filter((f) => f === 3).length,
//   ff.filter((f) => f === 4).length,
//   ff.filter((f) => f === 5).length,
// ];

// await fs.writeFile("./data/files3.json", JSON.stringify(insertFiles, null, 2), {
//   encoding: "utf8",
// });

const queue = new PQueue({ concurrency: 8 });

await db.raw("TRUNCATE TABLE files RESTART IDENTITY CASCADE");
insertFiles.forEach(async (file) => {
  await queue.add(() => db("files").insert(file));
});

await queue.onIdle();

const count = await db("files").count("*");
console.log("Source: ", insertFiles.length);
console.log("Target: ", count[0].count);

process.exit();
