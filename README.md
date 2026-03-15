# Cloud Task Manager

Cloud Task Manager to prosta aplikacja webowa umożliwiająca wyświetlanie listy zadań.  
Frontend aplikacji został zbudowany przy użyciu React i Vite, natomiast backend oparty jest o Node.js i Express.  
Aplikacja komunikuje się z API przy użyciu biblioteki Axios. Projekt wykorzystuje Docker oraz Docker Compose do uruchomienia kontenerów aplikacji.

## Technologie

- React + Vite
- Node.js + Express
- Axios
- Azure Cosmos DB Emulator
- Docker / Docker Compose

## Uruchomienie projektu

Projekt można uruchomić przy użyciu Docker Compose:


docker compose up


Frontend aplikacji będzie dostępny pod adresem:


http://localhost:8080


Backend API:


http://localhost:8081/tasks


## Komunikacja z API

Frontend pobiera dane z backendu przy użyciu metody GET oraz biblioteki Axios.  
Adres API jest przechowywany w zmiennej środowiskowej:


VITE_API_URL=http://localhost:8081


Dzięki temu adres backendu nie jest wpisany na stałe w kodzie aplikacji.