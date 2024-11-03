import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Provider from "../../../context/Provider";
import ChatRoomContext from "@/app/context/ChatRoomContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Room",
  description:
    "ChitChat chat room. \n chitChat is a web based social media platform that allows users across the world to connect",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main lang="en" className=" bg-slate-700">
      <section className={inter.className}>
        {/* <ChatRoomContext> */}
        <Provider>{children}</Provider>
        {/* </ChatRoomContext> */}
      </section>
    </main>
  );
}
