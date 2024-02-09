/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";
import { useEffect, useState, useRef } from "react";
import { useRoomContext } from "@/app/providers/room-context";
import { RoomMap, Message } from "../shared";
import { useUsers, useSelf } from "y-presence";
import { useSyncedStore } from "@syncedstore/react";

import RoomMessage from "./RoomMessage";

export default function Room() {
  const {
    provider,
    name,
    store: globalStore,
    currentUserId,
  } = useRoomContext();
  const [messageInput, setMessageInput] = useState("");
  const store = useSyncedStore(globalStore);
  const [doReply, setDoReply] = useState(false);
  const chatListRef = useRef(null);

  const users = useUsers(provider!.awareness);
  // console.log(users?.size);
  const self = useSelf(provider!.awareness);
  // Get room details
  const room = RoomMap[name];
  // const title = room?.title;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!self) return;
    if (!messageInput) return;

    const message = {
      userId: currentUserId,
      name: self.name,
      initials: self.initials,
      text: messageInput,
      timestamp: Date.now(),
    } as Message;

    store.messages.push(message);
    setMessageInput("");
    setTimeout(() => {
      scrollToBottom();
    }, 50);
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 750)
  }, [store.messages]);

  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }

  if (!provider) return null;
  if (!room) return null;

  return (
    <> 
      <div className="h-full w-full flex flex-col gap-6">
        <li className="mb-4 pulse-li absolute top-10 right-10"><i className="pulse green"></i><span className="text-black">{users?.size} LIVE</span></li>
        <ul ref={chatListRef} className="h-full flex flex-col gap-3">
          {store.messages.map((message: Message, index: number) => {
            const isMe = currentUserId === message.userId;
            return (
              <li key={index}>
                <RoomMessage message={message} isMe={isMe} />
              </li>
            );
          })}
        </ul>
        <form onSubmit={handleSubmit} className="sticky bottom-4 sm:bottom-6">
          <input
            placeholder="TYPE RANT HERE..."
            className="border border-stone-400 p-3 bg-[#E9F0FD] min-w-full rounded text-black text-lg"
            type="text"
            name="message"
            value={messageInput}
            onChange={(e) => {
              setMessageInput(e.target.value);
            }}
          ></input>
        </form>
      </div>
    </>
  );
}
