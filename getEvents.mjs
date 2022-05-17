import { $fetch } from "ohmyfetch";
import fs from "fs-extra";
import { url3 } from "./utils.mjs";

const data = await $fetch("/events", {
  method: "GET",
  baseURL: url3,
  params: { _limit: -1 },
});

await fs.writeFile("./data/events.json", JSON.stringify(data, null, 2), {
  encoding: "utf8",
});
