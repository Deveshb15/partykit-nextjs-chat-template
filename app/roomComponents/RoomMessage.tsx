/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import type { Message } from "../shared";
import Avatar from "@/app/components/Avatar";

export default function RoomMessage(props: {
  message: Message;
  isMe: boolean;
}) {
  const { message, isMe } = props;
  const [formattedDate, setFormattedDate] = useState<string | null>();

  // Format the date on the client to avoid hydration mismatch
  useEffect(
    () => setFormattedDate(new Date(message?.timestamp ?? "").toLocaleTimeString()),
    [message?.timestamp]
  );

  return (
    <li
      className={`flex justify-start gap-2 ${isMe ? "flex-row-reverse" : ""}`}
    >
      <div className="grow-0">
        <img
          src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${message?.initials}`}
          alt="avatar"
          width="40"
          height="40"
        />
      </div>
      <div className={`flex flex-col gap-1 ${isMe ? "items-end" : ""}`}>
        <span className="bg-stone-100 px-2 py-1 rounded-xl">
          {message.text}
        </span>
        <span className="text-xs text-stone-400">
          {formattedDate ?? <>&nbsp;</>}
        </span>
      </div>
    </li>
  );
}
