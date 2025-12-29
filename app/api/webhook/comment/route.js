import { createSystemMessage } from "@/app/_lib/MessageMapper";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";

async function handler(request) {
  const event = await request.json();

  console.log("Received comment event:", event);

  try {
    await createSystemMessage(event);
    console.log("System message created successfully");
  } catch (error) {
    console.error("Failed to create system message:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}

export const POST = verifySignatureAppRouter(handler);
