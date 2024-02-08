export type Npc = {
    userId: string;
    name: string;
    prompt: string;
  };
  
  type Room = {
    title: string;
    subtitle?: string;
    top: number;
    left: number;
    bgColor: string;
    npc: Npc | null;
  };
  
  type RoomMapType = {
    [key: string]: Room;
  };
  
  export const RoomMap: RoomMapType = {
    room1: {
      title: "Blue Hat: Process",
      subtitle:
        "Let's get started. What are you trying to accomplish? Where are you in the process?",
      top: 0,
      left: 0,
      bgColor: "bg-sky-100",
      npc: {
        userId: "npc-planning",
        name: "👷",
        prompt:
          "You are a helpful workshop facilitator. Listen to what I say then immediately suggest I explore the other rooms: exploring will help me go through different aspects of the thinking process. Each room represents a thinking hat. The rooms are: Green Hat (New Ideas), Yellow Hat (Positives), White Hat (Facts), Red Hat (Feelings), and Black Hat: (Evaluation). This room is Blue Hat (Process). Remind me to use the navigation arrows to change room. Be really succinct.",
      },
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
    isNpc: boolean;
    text: string;
    seenByNpc: boolean;
  };
  
  export const yDocShape = { messages: [] as Message[] };