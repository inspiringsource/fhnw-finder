# FHNW Raumsuche

Inoffizielle Web-App zur Suche von Raumplänen für die FHNW in Brugg-Windisch.

## Demo

https://fhnwfinder.vercel.app/

## Hinweis

Dieses Projekt ist ein inoffizielles Studentenprojekt und wird nicht von der FHNW betrieben.

## Zweck

Die App hilft dabei, eine sichtbare Raumbezeichnung wie `6.3A55` mit dem passenden internen Plan-Code zu verknüpfen und daraus direkt den richtigen Raumplan anzuzeigen.

Aktuell ist die App für FHNW Brugg-Windisch ausgelegt.

## Datenlogik

- `data/rauminfo.csv` enthält die verfügbaren internen Raumplan- und Bild-Codes.
- `data/rauminfo_logic.csv` enthält die Zuordnung zwischen öffentlicher Raumbezeichnung und internem Plan-Code.
- Die App verknüpft die sichtbare Raumbezeichnung mit dem internen Plan-Code, weil diese Werte nicht immer 1:1 gleich sind.

## Suchlogik

Die Suche arbeitet in drei Schritten:

1. Zuerst über die Zuordnung in `data/rauminfo_logic.csv`
2. Danach über direkte interne Codes
3. Danach über Teiltreffer als Fallback

## Projektstruktur

- `app/` enthält App Router, Layout und Seite.
- `src/components/` enthält die UI-Komponenten.
- `src/data/` enthält generierte Daten für Suche und Mapping.
- `src/lib/` enthält Such- und Hilfslogik.
- `scripts/` enthält Hilfsskripte für die Datenaufbereitung.
- `data/` enthält die CSV-Quelldaten.

## Lokal starten

```bash
npm install
npm run dev
```

## Umgebungsvariablen

Firebase wird nur für einen einfachen anonymen Seitenzähler verwendet.

- Keine Cookies
- Keine Benutzerkonten
- Kein personenbezogenes Tracking

Die benötigten Variablen sind in `.env.example` dokumentiert.

## Entwicklung

- Erster Prototyp mit kleiner hartcodierter Datenbasis
- Umstellung auf CSV-basierten Raumdatensatz
- Einführung der Mapping-Logik über `data/rauminfo_logic.csv`
- Anonymer Seitenzähler
- Aktueller Stand: `v0.2.2`
