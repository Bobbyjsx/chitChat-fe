import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "../context/ChatsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create a Room",
  description: "Generated by create next app",
};
type CreateRoomLayoutProps = {
  children: React.ReactNode;
};

export default function CreateRoomLayout({ children }: CreateRoomLayoutProps) {
  return (
    <section className={inter.className}>
      <Provider>{children}</Provider>
    </section>
  );
}
