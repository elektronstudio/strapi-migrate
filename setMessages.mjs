import { $fetch } from "ohmyfetch";
import { url4, db, largeQueue, log } from "./utils.mjs";

import messages from "./data/messages.json" assert { type: "json" };

const migrateMessage = (m) => {
  const message = {
    userid: m.userId,
    username: m.userName,
    channel: m.channel,
    type: m.type,
    value: typeof m.value == "object" ? JSON.stringify(m.value) : m.value,
  };
  const created_at = m.datetime;
  return { message, created_at };
};

async function insertMessage({ message, created_at }) {
  const {
    data: { id },
  } = await $fetch("/messages", {
    method: "POST",
    baseURL: url4,
    body: {
      data: message,
    },
    onRequestError: (e) => console.log(e),
  });

  await db("messages").where({ id }).update({
    created_at: created_at,
    updated_at: created_at,
  });
}

await db.raw("TRUNCATE TABLE messages RESTART IDENTITY CASCADE");

messages.forEach(async (message) => {
  await largeQueue.add(() => insertMessage(migrateMessage(message)));
});

await queue.onIdle();

const { data: data2 } = await $fetch("/messages", {
  method: "GET",
  baseURL: url4,
  params: { populate: "*" },
}).catch((e) => console.log(e));

log(messages.length);
log(data2.length);
