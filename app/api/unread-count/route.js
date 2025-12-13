import { auth } from "@/app/_lib/auth";
import { getConversationTotalUnreadCount } from "@/app/_lib/MessageMapper";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ count: 0 });
  }
  const count = await getConversationTotalUnreadCount(session.user.email);
  return NextResponse.json({ count });
}
