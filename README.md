# Cloud Task Manager

**Student:** Krystian Janczak 
**Number albumu:** 89571

## Opis projektu
Cloud Task Manager to aplikacja webowa umożliwiająca zarządzanie zadaniami w chmurze. Użytkownicy mogą dodawać, edytować, usuwać oraz oznaczać zadania jako wykonane za pomocą interfejsu webowego. Aplikacja wykorzystuje architekturę front-end i back-end połączoną poprzez REST API.

## Stos technologiczny

| Warstwa | Technologia |
|------|------------|
| Frontend | React 19 + Vite |
| Backend | Node.js 24 + Express |
| Baza danych | Azure Cosmos DB |
| Chmura | Microsoft Azure |

## Mapowanie usług Azure

| Komponent aplikacji | Usługa Azure |
|---------------------|-------------|
| Frontend | Azure Static Web Apps |
| Backend API | Azure App Service |
| Baza danych | Azure Cosmos DB |

## Status projektu

- [x] Artefakt 1: Architektura i struktura folderów
- [x] Artefakt 2: Środowisko wielokontenerowe uruchomione lokalnie (Docker Compose)

## Uruchomienie lokalne

Aby uruchomić projekt lokalnie, należy wykonać polecenie:

```bash
docker compose up ```

Aplikacja działa w środowisku wielokontenerowym i składa się z trzech usług:

- frontend
- backend
- baza danych Azure Cosmos DB Emulator