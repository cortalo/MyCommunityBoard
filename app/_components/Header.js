import Link from "next/link";
import { auth } from "../_lib/auth";
import NavbarContent from "./NavbarContent";
import { getMessageTotalUnreadCount } from "../_lib/MessageMapper";

async function Header() {
  const session = await auth();
  let conversationTotalUnreadCount = 0;
  if (session?.user?.id) {
    conversationTotalUnreadCount = await getMessageTotalUnreadCount(
      session.user.id
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
