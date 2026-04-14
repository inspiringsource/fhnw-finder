import { roomMapping } from "../data/room-mapping.ts";

export type ParsedRoomCode = {
  site: string | null;
  building: string | null;
  floor: string | null;
  suffix: string;
};

export type RoomEntry = ParsedRoomCode & {
  code: string;
  aliases: string[];
};

const ROOM_CODE_PATTERN = /^([^.]+)\.([^.]+)\.(.+)$/i;

export function normalizeSearchValue(value: string): string {
  return value.trim().toUpperCase();
}

export function isInternalRoomCode(value: string): boolean {
  return ROOM_CODE_PATTERN.test(normalizeSearchValue(value));
}

export function parseRoomCode(code: string): ParsedRoomCode {
  const normalized = normalizeSearchValue(code);
  const match = ROOM_CODE_PATTERN.exec(normalized);

  if (!match) {
    return {
      site: null,
      building: null,
      floor: null,
      suffix: normalized,
    };
  }

  const suffix = match[3];

  return {
    site: match[1],
    building: match[2],
    floor: suffix.charAt(0) || null,
    suffix,
  };
}

export function buildPlanImageUrl(code: string): string {
  return `https://raum.fhnw.ch/rauminfo/plan/${normalizeSearchValue(code)}.png`;
}

export function resolveMappedPublicRoomCode(value: string): string | null {
  const normalized = normalizeSearchValue(value);
  return roomMapping[normalized as keyof typeof roomMapping] ?? null;
}

export function createRoomEntry(code: string, aliases: readonly string[] = []): RoomEntry {
  return {
    code: normalizeSearchValue(code),
    aliases: aliases.map(normalizeSearchValue),
    ...parseRoomCode(code)
  };
}
