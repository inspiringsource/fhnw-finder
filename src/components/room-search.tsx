"use client";

import { useMemo, useState } from "react";
import { rooms } from "../data/rooms.ts";
import {
  searchRooms,
  shouldAutoSelectSingleResult,
  type RoomSearchResult,
} from "../lib/search.ts";
import styles from "../../app/page.module.css";

const defaultExamples = ["6.2A06", "5.3D11", "6.3A53", "6.2B03", "5.3C54"];

export function RoomSearch() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<RoomSearchResult | null>(
    null,
  );

  const results = useMemo(() => searchRooms(submittedQuery), [submittedQuery]);
  const autoSelected = shouldAutoSelectSingleResult(results)
    ? results[0]
    : null;
  const visibleRoom = selectedRoom ?? autoSelected ?? null;

  function handleSearch(searchValue: string) {
    setSubmittedQuery(searchValue);
    setSelectedRoom(null);
  }

  return (
    <>
      <section className={styles.searchCard}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch(query);
          }}
        >
          <div className={styles.searchRow}>
            <input
              className={styles.input}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="z. B. 6.2D55"
              aria-label="Raumcode"
            />
            <button className={styles.button} type="submit">
              Suchen
            </button>
          </div>
        </form>

        <div className={styles.examples}>
          Beispiele für die Suche:
          <div className={styles.exampleButtons}>
            {defaultExamples.map((example) => (
              <button
                key={example}
                type="button"
                className={styles.chip}
                onClick={() => {
                  setQuery(example);
                  handleSearch(example);
                }}
              >
                {example}
              </button>
            ))}
            
          </div>
        </div>

        <p className={styles.note}>
          Erfasste Codes im lokalen Datensatz: {rooms.length}
        </p>
      </section>

      {submittedQuery && results.length === 0 ? (
        <section className={styles.results}>
          <p className={styles.message}>Kein passender Raum gefunden.</p>
        </section>
      ) : null}

      {visibleRoom ? (
        <section className={styles.viewer}>
          <h2 className={styles.viewerTitle}>Plan: {visibleRoom.code}</h2>
          <img
            className={styles.image}
            src={visibleRoom.imageUrl}
            alt={`Plan fuer ${visibleRoom.code}`}
          />
        </section>
      ) : null}

      {results.length > 0 ? (
        <section className={styles.results}>
          <h2 className={styles.resultsTitle}>Suchergebnisse</h2>
          <div className={styles.resultList}>
            {results.map((room) => (
              <article key={room.code} className={styles.resultCard}>
                <p className={styles.code}>{room.code}</p>
                {room.site && room.building && room.floor ? (
                  <p className={styles.meta}>
                    Standort {room.site}, Gebaeude {room.building}, Stockwerk{" "}
                    {room.floor}, Suffix {room.suffix}
                  </p>
                ) : (
                  <p className={styles.meta}>Interner FHNW-Code: {room.code}</p>
                )}
                <p className={styles.url}>
                  <a href={room.imageUrl} target="_blank" rel="noreferrer">
                    {room.imageUrl}
                  </a>
                </p>
                <button
                  type="button"
                  className={styles.linkButton}
                  onClick={() => setSelectedRoom(room)}
                >
                  Plan anzeigen
                </button>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
