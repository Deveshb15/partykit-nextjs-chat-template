import type {
  Party,
  PartyKitServer,
  Connection,
  Request,
} from "partykit/server";
import type { Doc as YDoc } from "yjs";
import { onConnect } from "y-partykit";
import { YPartyKitStorage } from "y-partykit/storage";
import { yDocShape, type Message, RoomMap, type Npc } from "../app/shared";
import { syncedStore } from "@syncedstore/core";

const DEFAULT_NPC_MESSAGE = "...";

export type MessageType = {
  role: string;
  content: string;
};

export default class SpatialChatServer implements PartyKitServer {
  constructor(readonly party: Party) {}

  async onConnect(ws: Connection) {
    return onConnect(ws, this.party, {
      persist: true,
      callback: {
        handler: (ydoc) => {
          try {
            this.handleYDocChange(ydoc);
          } catch (e) {
            console.error("Error in ydoc update handler", e);
          }
        },
      },
    });
  }

  // For debug, dump the current state of the yDoc
  // When run locally, this can be seen at http://127.0.0.1:1999/party/room
  async onRequest(req: Request) {
    const roomStorage = new YPartyKitStorage(this.party.storage);
    const ydoc = await roomStorage.getYDoc(this.party.id);

    if (req.method === "GET") {
      if (!ydoc) {
        return new Response("No ydoc yet", { status: 404 });
      }
      const messages = ydoc.getArray("messages");
      return new Response(JSON.stringify(messages, null, 2));
    }

    return new Response("Unsupported method", { status: 400 });
  }

  /** Run when the Y.js document changes */
  async handleYDocChange(ydoc: YDoc) {
    // find out which room we're in and make sure there's an NPC in it
    const chatRoom = RoomMap[this.party.id] ?? null;
    if (!chatRoom.npc) return;

    // find the last message in the room
    const store = syncedStore(yDocShape, ydoc);
    const finalMessage = store.messages[store.messages.length - 1] as Message;

    // if it hasn't yet been handled
    // if (!finalMessage.seenByNpc) {
    //   // time to generate a response from the room's NPC
    //   finalMessage.seenByNpc = true;
    //   // store.messages.push({
    //   //   userId: chatRoom.npc.userId,
    //   //   name: chatRoom.npc.name,
    //   //   initials: chatRoom.npc.name,
    //   //   isNpc: true,
    //   //   text: DEFAULT_NPC_MESSAGE,
    //   //   seenByNpc: true,
    //   // });
    // }
  }
}
