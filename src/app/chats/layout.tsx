import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "../context/ChatsProvider";
import { ParallelRouteGuard } from "../components/ParralelRouteGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chats",
  description: "View your messages",
};
type ChatsLayoutProps = {
  chatLobby: React.ReactNode;
  chatInfo: React.ReactNode;
  chatMessages: React.ReactNode;
};

export default function ChatsLayout({
  chatLobby,
  chatInfo,
  chatMessages,
}: ChatsLayoutProps) {
  return (
    <section className={inter.className}>
      <Provider>
        <div className="flex w-full h-screen bg-slate-800">
          {/* Chat lobby takes less space */}
          <ParallelRouteGuard routeKey="chatLobby">
            <div className="sm:flex-[2] sm:min-w-[200px] w-full">
              {chatLobby}
            </div>
          </ParallelRouteGuard>

          {/* Chat messages take the majority of space */}
          <ParallelRouteGuard routeKey="chatMessages">
            <div className="sm:flex-[4] sm:min-w-[400px] w-full">
              {chatMessages}
            </div>
          </ParallelRouteGuard>

          {/* Chat info takes less space */}
          <ParallelRouteGuard routeKey="chatInfo">
            {/* <div className="flex-1 min-w-[200px]"> */}
            {chatInfo}
            {/* </div> */}
          </ParallelRouteGuard>
        </div>
      </Provider>
    </section>
  );
}
