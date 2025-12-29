import { createSystemMessage } from "@/app/_lib/MessageMapper";
import { qstash } from "./qstash";

export const EventProducer = {
  fireEvent: async (event) => {
    try {
      // In development, directly save to database instead of using QStash
      if (process.env.NODE_ENV === "development") {
        console.log("Development mode: directly saving message");
        await createSystemMessage(event);
        return;
      }

      // In production, use QStash
      await qstash.publishJSON({
        url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook/${event.topic}`,
        body: {
          topic: event.topic,
          userId: event.userId,
          entityType: event.entityType,
          entityId: event.entityId,
          entityUserId: event.entityUserId,
          data: event.data || {},
        },
      });
      console.log("Event fired:", event.topic);
    } catch (error) {
      console.error("Failed to fire event:", error);
      throw error;
    }
  },
};
