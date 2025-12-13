import Link from "next/link";
import { auth } from "../_lib/auth";
import { getConversationTotalUnreadCount } from "../_lib/MessageMapper";
import NavbarContent from "./NavbarContent";

async function Header() {
  const session = await auth();
  let conversationTotalUnreadCount = 0;
  if (session?.user?.email) {
    conversationTotalUnreadCount = await getConversationTotalUnreadCount(
      session.user.email
    );
  }
  return (
    <header className="bg-dark sticky-top">
      <div className="container">
        <NavbarContent
          session={session}
          unreadCount={conversationTotalUnreadCount}
        />
      </div>
    </header>
  );
}

export default Header;
