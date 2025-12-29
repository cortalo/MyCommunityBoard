import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";

async function handler(request) {
  const event = await request.json();

  console.log("Received like event:", event);

  // We'll add the message creation logic in next steps

  return Response.json({ success: true });
}

export const POST = verifySignatureAppRouter(handler);
