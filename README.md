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
- dane przechowywane są w bazie Azure Cosmos DB (chmura)

Backend udostępnia REST API pozwalające wykonywać operacje CRUD na zadaniach.

## Technologie

- Node.js (Express)
- React (Vite)
- - Azure Cosmos DB (NoSQL)
- Docker / Docker Compose
- Swagger (OpenAPI)
- Axios
- Git
- Azure Container Apps
- Azure Key Vault
- GitHub Actions (CI/CD)

## Architektura

Aplikacja składa się z trzech głównych komponentów:

- **Frontend (React)** – http://localhost:8080 (lokalnie) / Azure Container Apps (deployment)
- **Backend (Node.js)** – REST API dostępne pod `http://localhost:8081`
- **Cosmos DB Emulator** – baza danych uruchamiana w kontenerze Docker


## REST API

API udostępnia endpointy umożliwiające zarządzanie zadaniami:

- `GET /tasks`
- `GET /tasks/{id}`
- `POST /tasks`
- `PUT /tasks/{id}`
- `DELETE /tasks/{id}`

Endpointy można testować przy użyciu Swagger UI.

## Integracja z bazą danych

Połączenie z bazą danych realizowane jest przy użyciu zmiennych środowiskowych (Azure Key Vault).

Backend (Node.js) komunikuje się bezpośrednio z Azure Cosmos DB przy użyciu SDK @azure/cosmos.

Walidacja danych realizowana jest w backendzie (Node.js) poprzez sprawdzanie danych wejściowych w kodzie aplikacji.

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

Aplikacja została wdrożona w środowisku chmurowym Microsoft Azure (kontener Docker w Azure Container Apps,
z wykorzystaniem Azure Container Registry do przechowywania obrazu) z wykorzystaniem:

- Azure Container Apps – hosting backendu - endpointy:
- tasks https://cloud-task-manager-api.bluebeach-e53e0737.germanywestcentral.azurecontainerapps.io/tasks
- health https://cloud-task-manager-api.bluebeach-e53e0737.germanywestcentral.azurecontainerapps.io/health
- Azure Container Registry – przechowywanie obrazów Docker
- Azure Cosmos DB – baza danych NoSQL (dostępna tylko przez backend)

### Link do aplikacji:
https://cloud-task-manager-api.bluebeach-e53e0737.germanywestcentral.azurecontainerapps.io


## Konfiguracja środowiska

Backend wykorzystuje zmienne środowiskowe:

- COSMOS_ENDPOINT
- DbConnectionString (przechowywany w Azure Key Vault)
- COSMOS_DATABASE
- COSMOS_CONTAINER
- PORT
- CORS_ORIGIN

## 7. Zarządzanie sekretami (Azure Key Vault)

W ramach Artefaktu 7 usunięto dane wrażliwe z kodu aplikacji i przeniesiono je do Azure Key Vault.

Zastosowane rozwiązania:
- przechowywanie connection string do Cosmos DB w Azure Key Vault jako sekret `DbConnectionString`
- wykorzystanie Managed Identity do uwierzytelniania aplikacji w Azure
- przypisanie roli **Key Vault Secrets User** dla aplikacji w Azure Container Apps

Dzięki temu aplikacja nie przechowuje żadnych sekretów w kodzie ani w plikach konfiguracyjnych.

---

## 8. Testy i automatyzacja

W ramach Artefaktu 8 zaimplementowano testy oraz automatyzację wdrożeń.

### Test jednostkowy
- wykorzystano framework Jest
- test `NewTask_ShouldNotBeCompleted` sprawdza poprawność logiki tworzenia zadania
- test uruchamiany komendą `npm test`

### Automatyzacja (CI/CD)
- skonfigurowano GitHub Actions do automatycznego wdrażania aplikacji
- każde `git push` do gałęzi `main` uruchamia proces build i deploy do Azure Container Apps

### Nowa funkcjonalność
- dodano możliwość usuwania zadań z poziomu frontend (React)
- wykorzystano endpoint `DELETE /tasks/:id` w backendzie
- Dodano zielony kolor do napisów i obramowań w aplikacji

---

Dostępne endpointy:
- /tasks
- /health

Aplikacja korzysta z:
- Azure Container Apps
- Azure Cosmos DB
- Azure Key Vault
- GitHub Actions (CI/CD)

## Status projektu

Projekt jest w pełni funkcjonalny i wdrożony w chmurze Azure.

## Status artefaktów

- [x] Artefakt 1 – konfiguracja projektu i środowiska
- [x] Artefakt 2 – konfiguracja Docker i uruchomienie aplikacji
- [x] Artefakt 3 – implementacja backend API
- [x] Artefakt 4 – REST API, integracja z bazą danych, kontrolery oraz walidacja danych
- [x] Artefakt 5 – przygotowanie aplikacji do środowiska chmurowego
- [x] Artefakt 6 - Wdrożenie aplikacji do Azure.
- [x] Artefakt 7 - Zabezpieczenie aplikacji.
- [x] Artefakt 8 - Wybudowany bezpiecznik i wdrożony automat CI/CD.


Projekt jest wersjonowany przy użyciu systemu kontroli wersji Git.
Aplikacja dostępna publicznie w chmurze Azure i zintegrowana z bazą danych Cosmos DB.
