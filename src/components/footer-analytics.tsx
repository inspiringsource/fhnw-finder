"use client";

import { useId, useRef } from "react";
import styles from "../../app/page.module.css";

export function FooterAnalytics() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <div className={styles.analyticsBadge}>
        <span>Anonymer Seitenzähler aktiv</span>
        <button
          type="button"
          className={styles.infoButton}
          aria-haspopup="dialog"
          aria-controls="analytics-info-dialog"
          aria-label="Informationen zu Analytics anzeigen"
          onClick={openDialog}
        >
          <span aria-hidden="true">i</span>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        id="analytics-info-dialog"
        className={styles.analyticsDialog}
        aria-labelledby={titleId}
      >
        <div className={styles.analyticsDialogBody}>
          <h2 id={titleId} className={styles.analyticsDialogTitle}>
            Datenschutz
          </h2>
          <p className={styles.analyticsDialogText}>
            Diese Website zählt ausschliesslich anonyme Seitenaufrufe.
          </p>
          <p className={styles.analyticsDialogText}>
            Es werden keine Cookies gesetzt, keine Benutzerkonten verwendet und keine personenbezogenen Daten gespeichert.
          </p>
          <p className={styles.analyticsDialogText}>
            Es erfolgt kein personenbezogenes Tracking.
          </p>

          <button
            type="button"
            className={styles.dialogCloseButton}
            onClick={closeDialog}
          >
            Schliessen
          </button>
        </div>
      </dialog>
    </>
  );
}
