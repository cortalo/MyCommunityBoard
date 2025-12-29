import { qstash } from "@/lib/qstash";

export async function GET() {
  try {
    await qstash.publishJSON({
      url: "https://webhook.site/4efc1409-3a88-4a0e-9311-19dbe07a9bef", // paste your webhook.site URL here
      body: {
        message: "Hello from QStash!",
        timestamp: Date.now(),
      },
    });

    return Response.json({ success: true, message: "Message sent!" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
