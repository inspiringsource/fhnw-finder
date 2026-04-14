import { rooms } from "../data/rooms.ts";
import {
  buildPlanImageUrl,
  resolveMappedPublicRoomCode,
  normalizeSearchValue,
  type RoomEntry
} from "./rooms.ts";

export type RoomSearchResult = RoomEntry & {
  imageUrl: string;
  score: number;
};

function scoreRoomMatch(room: RoomEntry, query: string): number {
  const fullCode = room.code;
  const suffix = room.suffix;
  const buildingFloor = room.site && room.building ? `${room.site}.${room.building}` : "";
  const aliasMatch = room.aliases.find((alias) => alias === query);

  if (fullCode === query) return 120;
  if (aliasMatch) return 110;
  if (suffix === query) return 100;
  if (room.suffix === query) return 95;
  if (buildingFloor === query) return 90;
  if (room.aliases.some((alias) => alias.includes(query))) return 70;
  if (fullCode.includes(query)) return 60;
  if (suffix.includes(query)) return 50;
  if (room.suffix.includes(query)) return 45;
  if (buildingFloor.includes(query)) return 40;

  return 0;
}

function resolveExactRoom(query: string): RoomEntry | null {
  const mappedInternalCode = resolveMappedPublicRoomCode(query);

  if (mappedInternalCode) {
    return rooms.find((room) => room.code === mappedInternalCode) ?? null;
  }

  const exactCodeMatch = rooms.find((room) => room.code === query);

  if (exactCodeMatch) {
    return exactCodeMatch;
  }

  return rooms.find((room) => room.aliases.includes(query)) ?? null;
}

export function searchRooms(rawQuery: string): RoomSearchResult[] {
  const query = normalizeSearchValue(rawQuery);

  if (!query) {
    return [];
  }

  const exactRoom = resolveExactRoom(query);
  const scoredRooms = rooms
    .map((room) => {
      const score = scoreRoomMatch(room, query);
      return {
        ...room,
        imageUrl: buildPlanImageUrl(room.code),
        score
      };
    })
    .filter((room) => room.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.code.localeCompare(b.code);
    });

  if (!exactRoom) {
    return scoredRooms;
  }

  return [
    {
      ...exactRoom,
      imageUrl: buildPlanImageUrl(exactRoom.code),
      score: 130
    },
    ...scoredRooms.filter((room) => room.code !== exactRoom.code)
  ];
}

export function shouldAutoSelectSingleResult(results: RoomSearchResult[]): boolean {
  return results.length === 1;
}
