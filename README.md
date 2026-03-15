# Cloud Task Manager

Cloud Task Manager to aplikacja do zarządzania zadaniami oparta na architekturze klient–serwer. Projekt składa się z backendowego REST API oraz frontendowego interfejsu użytkownika. Backend został zbudowany w technologii ASP.NET Core, natomiast dane przechowywane są w bazie Microsoft SQL Server.

## Funkcjonalności

Aplikacja umożliwia:
- tworzenie nowych zadań
- przeglądanie listy zadań
- edytowanie istniejących zadań
- oznaczanie zadań jako wykonane
- usuwanie zadań

Backend udostępnia REST API pozwalające wykonywać operacje CRUD na zadaniach.

## Technologie

- ASP.NET Core Web API
- Entity Framework Core
- Microsoft SQL Server Express
- Docker / Docker Compose
- Swagger (OpenAPI)
- Git

## REST API

API udostępnia endpointy umożliwiające zarządzanie zadaniami:

- `GET /api/tasks` – pobranie wszystkich zadań
- `GET /api/tasks/{id}` – pobranie pojedynczego zadania
- `POST /api/tasks` – utworzenie nowego zadania
- `PUT /api/tasks/{id}` – aktualizacja zadania
- `DELETE /api/tasks/{id}` – usunięcie zadania

Endpointy można testować przy użyciu Swagger UI.

## Integracja z bazą danych

Backend korzysta z Entity Framework Core do komunikacji z bazą danych Microsoft SQL Server.  
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

## Status artefaktów

- [x] Artefakt 1 – konfiguracja projektu i środowiska
- [x] Artefakt 2 – konfiguracja Docker i uruchomienie aplikacji
- [x] Artefakt 3 – implementacja backend API
- [x] Artefakt 4 – REST API, integracja z bazą danych, kontrolery oraz walidacja danych

Projekt jest wersjonowany przy użyciu systemu kontroli wersji Git.