import { FooterAnalytics } from "../src/components/footer-analytics.tsx";
import { RoomSearch } from "../src/components/room-search.tsx";
import { VisitorCounter } from "../src/components/visitor-counter.tsx";
import { APP_VERSION } from "../src/config/version.ts";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>FHNW Raumsuche</h1>
          <p className={styles.subtitle}>Raum eingeben und den passenden Plan anzeigen.</p>
        </header>

        <RoomSearch />

        <section className={styles.info}>
          <p className={styles.message}>
            Die Suche basiert auf einem aufbereiteten, oeffentlich verfuegbaren Raumdatensatz.
          </p>
        </section>

        <footer className={styles.version}>
          <FooterAnalytics />
          <VisitorCounter />
          Version {APP_VERSION} – FHNW Brugg-Windisch<br />
          <small>Inoffizielles Studentenprojekt, nicht von der FHNW betrieben</small>
        </footer>
      </div>
    </main>
  );
}
