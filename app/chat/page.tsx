import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { User } from "@/party/utils/auth";
import Link from "next/link";
import { Room } from "./Room";
import PresenceBar from "./components/PresenceBar";
import ClearRoomButton from "./components/ClearRoomButton";
import { PARTYKIT_HOST, PARTYKIT_URL } from "@/app/env";

const party = "chatroom";

export const revalidate = 0;

export default async function ChatRoomPage() {
  // fetch initial data for server rendering
  const url = `${PARTYKIT_URL}/parties/${party}/team7`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  const room = res.status === 404 ? null : await res.json();

  // fetch user session for server rendering
  const user = null;

  return (
    <div className="w-full flex flex-col gap-4 justify-between items-start">
      <div className="flex flex-wrap justify-start items-center gap-x-4 gap-y-2">
        <Link href="/chat" className="text-stone-400 whitespace-nowrap">
          &lt;- All Rooms
        </Link>
        <ClearRoomButton roomId="team7" />
      </div>
      {room ? (
        <>
          <div className="w-full flex flex-row justify-between items-start pb-6">
            {/* <div>
              <h1 className="text-4xl font-medium">{params.roomId}</h1>
            </div> */}
            <PresenceBar roomId="team7" />
          </div>

          <Room
            host={PARTYKIT_HOST}
            party={party}
            user={user}
            room="team7"
            messages={room.messages ?? []}
          />
        </>
      ) : (
        <h1 className="text-4xl font-medium">Room not found</h1>
      )}
    </div>
  );
}
