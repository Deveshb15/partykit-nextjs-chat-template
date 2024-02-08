"use client";
import { FormEventHandler, useEffect, useState } from "react";
import usePartySocket from "partysocket/react";
import type { Message, ChatMessage } from "@/party/utils/message";
import PartySocket from "partysocket";
import Link from "next/link";
import RoomMessage from "./components/RoomMessage";
import ConnectionStatus from "@/app/components/ConnectionStatus";

type User = {
  username: string;
  name?: string;
  email?: string;
  image?: string;
  expires?: string;
};

export const Room: React.FC<{
  room: string;
  host: string;
  user: User | null;
  party: string;
  messages: Message[];
}> = ({ room, host, user: initialUser, party, messages: initialMessages }) => {
  // render with initial data, update from websocket as messages arrive
  const [messages, setMessages] = useState(initialMessages);
  const [user, setUser] = useState(initialUser);
  const socket = usePartySocket({
    host,
    party,
    room,
    onOpen(e) {
      // e.target is the WebSocket instance
      // now that the connection is open, we can send user information
      // don't use identify, I want to skip authentication for now
      console.log("socket open ", e.target);
      // get from local storage if available
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // create a random user
        const newUser = {
          username: `user-${Math.floor(Math.random() * 10000)}`,
          name: "Anonymous",
          image: "https://i.pravatar.cc/300",
        };
        socket.send(JSON.stringify({ type: "user", user: newUser }));
        setUser(newUser);
      }
    },
    onMessage(event: MessageEvent<string>) {
      const message = JSON.parse(event.data) as ChatMessage;
      // upon connection, the server will send all messages in the room
      if (message.type === "sync") setMessages(message.messages);
      // after that, the server will send updates as they arrive
      if (message.type === "new") setMessages((prev) => [...prev, message]);
      if (message.type === "clear") setMessages([]);
      if (message.type === "edit") {
        setMessages((prev) =>
          prev.map((m) => (m.id === message.id ? message : m))
        );
      }
      scrollToBottom();
    },
  });

  console.log("messages ", messages);

  useEffect(() => {
    if (
      socket?.readyState === socket.OPEN
    ) {
      socket.send(JSON.stringify({ type: "sync" }));
    }
  }, [socket]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const text = event.currentTarget.message.value;
    if (text?.trim()) {
      socket.send(JSON.stringify({ type: "new", text }));
      event.currentTarget.message.value = "";
      scrollToBottom();
    }
  };

  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }

  console.log("messages ", messages);

  return (
    <>
      <div className="h-full w-full flex flex-col gap-6">
        {messages.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {messages.map((message) => (
              <RoomMessage
                key={message.id}
                message={message}
                isMe={message.from.id === user?.username}
              />
            ))}
          </ul>
        ) : (
          <p className="italic">No messages yet</p>
        )}
        <form onSubmit={handleSubmit} className="sticky bottom-4 sm:bottom-6">
          <input
            placeholder="Send message..."
            className="border border-stone-400 p-3 bg-stone-100 min-w-full rounded"
            type="text"
            name="message"
          ></input>
        </form>
      </div>
      <ConnectionStatus socket={socket} />
    </>
  );
};
