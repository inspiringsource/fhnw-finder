# FHNW Map Finder

Inoffizielle Web-App zur Suche von Raumplaenen fuer die FHNW in Brugg-Windisch.

Demo: https://fhnwfinder.vercel.app/

Hinweis: Dieses Projekt ist ein inoffizielles Studentenprojekt und wird nicht von der FHNW betrieben.

## Zweck

Die App hilft dabei, eine sichtbare Raumbezeichnung wie `6.3A55` mit dem passenden internen Plan-Code zu verknuepfen und daraus direkt den richtigen Raumplan anzuzeigen.

Aktuell ist die App fuer FHNW Brugg-Windisch ausgelegt.

## Datenlogik

- `data/rauminfo.csv` enthaelt die verfuegbaren internen Raumplan- und Bild-Codes.
- `data/rauminfo_logic.csv` enthaelt die Zuordnung zwischen oeffentlicher Raumbezeichnung und internem Plan-Code.
- Die App verknuepft also die sichtbare Raumbezeichnung mit dem internen Plan-Code, weil diese Werte nicht immer 1:1 gleich sind.

## Suchlogik

Die Suche arbeitet in drei Schritten:

1. Zuerst ueber die Zuordnung in `rauminfo_logic.csv`
2. Danach ueber direkte interne Codes
3. Danach ueber Teiltreffer als Fallback

## Projektstruktur

- `app/` App-Router, Layout und Seite
- `src/components/` UI-Komponenten
- `src/data/` generierte Daten fuer Suche und Mapping
- `src/lib/` Such- und Hilfslogik
- `scripts/` Hilfsskripte fuer die Datenaufbereitung
- `data/` CSV-Quelldaten

## Lokal starten

```bash
npm install
npm run dev
```

## Env-Variablen

Firebase wird nur fuer einen einfachen anonymen Seitenzaehler verwendet.

- keine Cookies
- keine Benutzerkonten
- kein personenbezogenes Tracking

Die benoetigten Variablen sind in `.env.example` dokumentiert.

## Entwicklung

- erster Prototyp mit kleiner hartcodierter Datenbasis
- Umstellung auf CSV-basierten Raumdatensatz
- Einfuehrung der Mapping-Logik ueber `rauminfo_logic.csv`
- anonymer Seitenzaehler
- aktueller Stand: `v0.2.2`
