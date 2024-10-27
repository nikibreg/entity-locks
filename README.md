# How to run

1. run `cd api; npm i`
2. then run `npm start`
3. open a new terminal inside root directory and run `npm i` and then run `npm run dev`
4. navigate to [localhost:4200](http://localhost:4200)

# How It Works

## UI

### 1 view to rule them all

The main veiw is able to display everything in kanban style. Each card displays lock state and actions such as handle, lock and skip (unlocks).

With the auth component we get user ID to simulate an authentication.


## API

There is only one (`status`) field that is utilized for the whole locking mechanism.

We don't store users since we simply don't need them and don't have database level policies.

Our API uses the following setup to handle requests efficiently:

1. **server.js**:
   - Spawns multiple mini-servers, one for each CPU core on your machine.
2. **index.js**:
   - Sends incoming requests to different mini-servers to spread the work.


**Alternatively and arguably for more efficiency we could've spawned workers instead of express apps, but the current method is simpler and works well for our use case.**