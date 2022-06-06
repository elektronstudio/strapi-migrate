import { $fetch } from "ohmyfetch";
import fs from "fs-extra";
import { messagesUrl } from "./utils.mjs";

const data = await $fetch(messagesUrl, {
  method: "GET",
});

await fs.writeFile("./data/messages.json", JSON.stringify(data, null, 2), {
  encoding: "utf8",
});
