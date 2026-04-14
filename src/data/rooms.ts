import { roomCodes } from "./room-codes.ts";
import { roomMapping } from "./room-mapping.ts";
import { roomAliases } from "./room-aliases.ts";
import { createRoomEntry, type RoomEntry } from "../lib/rooms.ts";

const mappedAliasesByInternalCode = Object.entries(roomMapping).reduce<
  Partial<Record<string, string[]>>
>((accumulator, [publicCode, internalCode]) => {
  const aliases = accumulator[internalCode] ?? [];
  aliases.push(publicCode);
  accumulator[internalCode] = aliases;
  return accumulator;
}, {});

export const rooms: RoomEntry[] = roomCodes.map((code) =>
  createRoomEntry(code, [
    ...(mappedAliasesByInternalCode[code] ?? []),
    ...(roomAliases[code] ?? []),
  ]),
);
