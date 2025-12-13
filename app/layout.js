import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { auth } from "./_lib/auth";
import {
  insertData,
  selectUserByEmail,
  updateUserImage,
  updateUserName,
} from "./_lib/UserMapper";
import { getConversationTotalUnreadCount } from "./_lib/MessageMapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Community Forum",
  description: "A complete forum",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  if (session?.user?.email) {
    const user = await selectUserByEmail(session.user.email);
    if (user.length === 0) {
      try {
        insertData("users", {
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        });
      } catch (error) {
        console.log("failed: ", error);
      }
    } else {
      if (user[0].name != session.user.name) {
        updateUserName("users", user[0].id, session.user.name);
      }
      if (user[0].image != session.user.image) {
        updateUserImage("users", user[0].id, session.user.image);
      }
    }
  }
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <div id="root">
          <div className="nk-container">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
