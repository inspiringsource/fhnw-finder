import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const roomInfoPath = resolve(process.cwd(), "data/rauminfo.csv");
const roomLogicPath = resolve(process.cwd(), "data/rauminfo_logic.csv");
const roomCodesOutputPath = resolve(process.cwd(), "src/data/room-codes.ts");
const roomMappingOutputPath = resolve(process.cwd(), "src/data/room-mapping.ts");

function normalizeValue(value: string): string {
  return value.trim().toUpperCase();
}

const rawRoomInfoCsv = readFileSync(roomInfoPath, "utf8");
const roomCodes = Array.from(
  new Set(
    rawRoomInfoCsv
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const columns = line.split(",");
        const filename = columns.at(-1)?.trim();

        if (!filename) {
          return "";
        }

        return normalizeValue(filename.replace(/\.png$/i, ""));
      })
      .filter(Boolean),
  ),
).sort((a, b) => a.localeCompare(b));

const rawRoomLogicCsv = readFileSync(roomLogicPath, "utf8");
const roomMapping = Object.fromEntries(
  rawRoomLogicCsv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line) => {
      const columns = line.split(",");
      const publicRoomCode = normalizeValue(columns[0] ?? "");
      const internalField = columns.at(-1)?.trim() ?? "";
      const internalRoomCode = normalizeValue(
        internalField.replace(/^\(/, "").replace(/\)$/, ""),
      );

      if (!publicRoomCode || !internalRoomCode) {
        return [];
      }

      return [[publicRoomCode, internalRoomCode] as const];
    }),
);

const roomCodesOutput = `export const roomCodes = [
${roomCodes.map((code) => `  ${JSON.stringify(code)},`).join("\n")}
] as const;
`;

const roomMappingEntries = Object.entries(roomMapping).sort(([left], [right]) =>
  left.localeCompare(right),
);
const roomMappingOutput = `export const roomMapping = {
${roomMappingEntries
  .map(([publicCode, internalCode]) => `  ${JSON.stringify(publicCode)}: ${JSON.stringify(internalCode)},`)
  .join("\n")}
} as const;
`;

writeFileSync(roomCodesOutputPath, roomCodesOutput, "utf8");
writeFileSync(roomMappingOutputPath, roomMappingOutput, "utf8");

console.log(`Aktualisiert: ${roomCodes.length} Raumcodes in src/data/room-codes.ts`);
console.log(`Aktualisiert: ${roomMappingEntries.length} Zuordnungen in src/data/room-mapping.ts`);
