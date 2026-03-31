# Cloud Task Manager

Cloud Task Manager to aplikacja do zarządzania zadaniami oparta na architekturze klient–serwer. Projekt składa się z backendowego REST API oraz frontendowego interfejsu użytkownika. Backend został zbudowany w technologii Node.js, natomiast dane przechowywane są w bazie Azure Cosmos DB.

## Funkcjonalności

Aplikacja umożliwia:
- tworzenie nowych zadań
- przeglądanie listy zadań
- edytowanie istniejących zadań
- oznaczanie zadań jako wykonane
- usuwanie zadań
- użytkownik może dodawać zadania bezpośrednio z poziomu aplikacji React (bez użycia Swaggera)
- dane przechowywane są w bazie Cosmos DB (emulator)

Backend udostępnia REST API pozwalające wykonywać operacje CRUD na zadaniach.

## Technologie

- Node.js (Express)
- React (Vite)
- Azure Cosmos DB Emulator (NoSQL)
- Docker / Docker Compose
- Swagger (OpenAPI)
- Axios
- Git

## Architektura

Aplikacja składa się z trzech głównych komponentów:

- **Frontend (React)** – interfejs użytkownika dostępny pod `http://localhost:8080`
- **Backend (Node.js)** – REST API dostępne pod `http://localhost:8081`
- **Cosmos DB Emulator** – baza danych uruchamiana w kontenerze Docker


## REST API

API udostępnia endpointy umożliwiające zarządzanie zadaniami:

- `GET /api/tasks` – pobranie wszystkich zadań
- `GET /api/tasks/{id}` – pobranie pojedynczego zadania
- `POST /api/tasks` – utworzenie nowego zadania
- `PUT /api/tasks/{id}` – aktualizacja zadania
- `DELETE /api/tasks/{id}` – usunięcie zadania

Endpointy można testować przy użyciu Swagger UI.

## Integracja z bazą danych

Połączenie z bazą skonfigurowane jest przy użyciu connection string w pliku `appsettings.json`.

Kontroler `TasksController` wykorzystuje kontekst bazy danych `AppDbContext` do wykonywania operacji CRUD.

Dodatkowo zastosowano walidację danych przy użyciu atrybutów DataAnnotations, takich jak:

- `[Required]`
- `[StringLength]`

API zwraca odpowiednie kody HTTP:

- **200 OK** – poprawne pobranie danych
- **201 Created** – utworzenie rekordu
- **204 No Content** – poprawna aktualizacja lub usunięcie
- **400 Bad Request** – niepoprawne dane wejściowe
- **404 Not Found** – brak zasobu

## Trwałość danych (Artefakt 5.2)

Zastosowano **named volume w Docker Compose**, co zapewnia trwałość danych.

## Dodawanie zadań (5.4)

Zadania można dodawać bezpośrednio w aplikacji React poprzez formularz, który wysyła dane do backendu metodą POST. Swagger nie jest używany.

## Migracje (5.3)

Projekt korzysta z Node.js, dlatego nie używa migracji (jak w .NET). Struktura danych w Cosmos DB jest obsługiwana bezpośrednio przez kod aplikacji.

## 6.Deployment (Azure)

Aplikacja została wdrożona w środowisku chmurowym Microsoft Azure z wykorzystaniem:

- Azure Container Apps – hosting backendu - endpointy:
- tasks https://cloud-task-manager-api.bluebeach-e53e0737.germanywestcentral.azurecontainerapps.io/tasks
- health https://cloud-task-manager-api.bluebeach-e53e0737.germanywestcentral.azurecontainerapps.io/health
- Azure Container Registry – przechowywanie obrazów Docker
- Azure Cosmos DB – baza danych NoSQL - https://cloud-app-krystian.documents.azure.com:443/
<img width="1884" height="631" alt="Zrzut ekranu 2026-03-31 102827" src="https://github.com/user-attachments/assets/84b4c618-c68f-4651-8804-fbc64d424acc" />
<img width="1027" height="212" alt="Zrzut ekranu 2026-03-31 103039" src="https://github.com/user-attachments/assets/daea3a8a-7ee6-4b5f-a670-435b1fb98746" />
<img width="846" height="176" alt="Zrzut ekranu 2026-03-31 103052" src="https://github.com/user-attachments/assets/d072d1ff-bf3d-4978-8360-cbd16ca4af3d" />
<img width="1552" height="163" alt="image" src="https://github.com/user-attachments/assets/87c90361-be82-45a5-8ca0-a898bef5397d" />




## Status artefaktów

- [x] Artefakt 1 – konfiguracja projektu i środowiska
- [x] Artefakt 2 – konfiguracja Docker i uruchomienie aplikacji
- [x] Artefakt 3 – implementacja backend API
- [x] Artefakt 4 – REST API, integracja z bazą danych, kontrolery oraz walidacja danych
- [x] Artefakt 5 – przygotowanie aplikacji do środowiska chmurowego
- [x] Artefakt 6 - Wdrożenie aplikacji do Azure.


Projekt jest wersjonowany przy użyciu systemu kontroli wersji Git.
