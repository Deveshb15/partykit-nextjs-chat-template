import type {
  Party,
  PartyKitServer,
  Connection,
  Request,
} from "partykit/server";
import type { Doc as YDoc } from "yjs";
import { onConnect } from "y-partykit";
import { YPartyKitStorage } from "y-partykit/storage";
import { yDocShape, type Message, RoomMap  } from "../app/shared";
import { syncedStore } from "@syncedstore/core";

export type MessageType = {
  role: string;
  content: string;
};

export default class SpatialChatServer implements PartyKitServer {
  constructor(readonly party: Party) {}

  async onConnect(ws: Connection) {
    return onConnect(ws, this.party, {
      persist: true,
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
}
