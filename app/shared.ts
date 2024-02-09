
  
  type Room = {
    title: string;
    subtitle?: string;
    top: number;
    left: number;
    bgColor: string;
  };
  
  type RoomMapType = {
    [key: string]: Room;
  };
  
  export const RoomMap: RoomMapType = {
    room1: {
      title: "",
      subtitle:
        "Singles only",
      top: 0,
      left: 0,
      bgColor: "bg-sky-100",
    }
  };
  
  export type RoomName = string;
  
  export const DEFAULT_ROOM: RoomName = "room1";
  
  export type User = {
    name: string;
    initials: string;
  };
  
  export type Message = {
    userId: string;
    name: string;
    initials: string;
    text: string;
    timestamp?: number | string;
  };
  
  export const yDocShape = { messages: [] as Message[] };