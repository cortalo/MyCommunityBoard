import { Client } from "@upstash/qstash";

export const qstash = new Client({
  token: process.env.QSTASH_TOKEN,
});

// await client.publish({
//   url: "https://example.com",
// });
