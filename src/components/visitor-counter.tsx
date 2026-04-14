"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase.ts";
import styles from "../../app/page.module.css";

let hasCountedThisLoad = false;

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const updateCounter = async () => {
      try {
        const visitsRef = doc(db, "stats", "visits");

        if (!hasCountedThisLoad) {
          hasCountedThisLoad = true;

          await updateDoc(visitsRef, {
            visits: increment(1)
          });
        }

        const snapshot = await getDoc(visitsRef);
        const visits = snapshot.data()?.visits;

        if (isMounted) {
          setCount(typeof visits === "number" ? visits : null);
        }
      } catch (error) {
        console.error("Visitor counter unavailable", error);
      }
    };

    void updateCounter();

    return () => {
      isMounted = false;
    };
  }, []);

  return <p className={styles.analyticsCount}>Besucher: {count ?? "..."}</p>;
}
