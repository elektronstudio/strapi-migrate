import { $fetch } from "ohmyfetch";
import fs from "fs-extra";
import { url3, log } from "./utils.mjs";

const data1 = await $fetch("/events", {
  method: "GET",
  baseURL: url3,
  params: { _limit: -1 },
});

const data2 = await $fetch("/events", {
  method: "GET",
  baseURL: url3,
  params: { _limit: -1, _publicationState: "preview", published_at_null: true },
});

const data = [...data1, ...data2].sort((a, b) => a.id - b.id);

await fs.writeFile("./data/events.json", JSON.stringify(data, null, 2), {
  encoding: "utf8",
});
