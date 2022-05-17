import { $fetch } from "ohmyfetch";
import { url4 } from "./utils.mjs";

async function insertEvent({ en, et }) {
  // Create english item
  const {
    data: { id: engId },
  } = await $fetch("/events", {
    method: "POST",
    baseURL: url4,
    body: {
      data: { ...en, publishedAt: new Date().toISOString() },
    },
  }).catch((e) => console.log(e));

  // Create estonian item and link it to English item
  const { id: etId } = await $fetch(`/events/${engId}/localizations`, {
    method: "POST",
    baseURL: url4,
    body: { ...et, locale: "et" },
  }).catch((e) => console.log(e));

  // Publish estonian item (can not pass publishedAt to previous fetch call)
  await $fetch(`/events/${etId}`, {
    method: "PUT",
    baseURL: url4,
    body: { data: { publishedAt: new Date().toISOString() } },
  }).catch((e) => console.log(e));
}

const en = {
  title: "ccc Some test title",
};
const et = {
  title: "ccc Eesti vark",
};

await insertEvent({ en, et });

const { data: data3 } = await $fetch("/events", {
  method: "GET",
  baseURL: url4,
  params: { populate: "*" },
}).catch((e) => console.log(e));

log(data3);
