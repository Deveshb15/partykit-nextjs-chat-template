"use client";

import { useState, useEffect, createContext, useContext, useMemo } from "react";

import YPartyKitProvider from "y-partykit/provider";
import { syncedStore } from "@syncedstore/core";
import { Doc } from "yjs";
import { type User, yDocShape } from "../shared";

import {
  useUsers as yPresenceUseUsers,
  useSelf as yPresenceUseSelf,
} from "y-presence";

interface RoomContextType {
  provider: YPartyKitProvider | null;
  name: string;
  store: any | null;
  currentUserId: string | null;
}

export const RoomContext = createContext<RoomContextType>({
  provider: null,
  name: "",
  store: null,
  currentUserId: null,
});

export function useRoomContext() {
  return useContext(RoomContext);
}

export default function RoomContextProvider(props: {
  name: string;
  currentUser: User | null;
  children: React.ReactNode;
}) {
  const { name, currentUser } = props;
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [doc] = useState(new Doc());
  /*const [provider, setProvider] = useState<YPartyKitProvider>(
    new YPartyKitProvider("localhost:1999", name, doc, { connect: false })
  );*/

  const provider = useMemo(() => {
    return new YPartyKitProvider(
      process.env.NEXT_PUBLIC_PARTYKIT_HOST!,
      name,
      doc,
      {
        connect: false,
      }
    );
  }, [name, doc]);

  const [store, setStore] = useState(syncedStore(yDocShape, doc));

  const onConnect = () => {
    setLoading(false);
  };

  const onDisconnect = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (!provider) return;

    let userId = localStorage.getItem("spatial-chat:room:currentUserId");
    if (!userId) {
      userId = provider.awareness.clientID.toString();
      setCurrentUserId(userId);
      localStorage.setItem("spatial-chat:room:currentUserId", userId);
    } else {
      setCurrentUserId(userId);
    }
    if (currentUser) {
      provider.awareness.setLocalState(currentUser);
    }
    return () => {
      provider.awareness.setLocalState(null);
    };
  }, [currentUser, provider]);

  useEffect(() => {
    const onSync = (connected: boolean) => {
      connected ? onConnect() : onDisconnect();
    };
    provider.on("sync", onSync);
    provider.connect();
    return () => {
      provider.disconnect();
      provider.off("sync", onSync);
    };
  }, [provider]);

  return (
    <RoomContext.Provider
      value={{
        provider: provider,
        name: name,
        store: store,
        currentUserId: currentUserId,
      }}
    >
      {loading && <p>Loading...</p>}
      {!loading && props.children}
    </RoomContext.Provider>
  );
}