# API

## How It Works

Our API uses the following setup to handle requests efficiently:

1. **server.js**:
   - Spawns multiple mini-servers, one for each CPU core on your machine.
2. **index.js**:
   - Sends incoming requests to different mini-servers to spread the work.

# UI

## 1 view to rule them all

The veiw is able to display everything in kanban style. Each card displays lock state and actions such as handle, lock and skip (unlocks).
