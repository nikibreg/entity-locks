const express = require("express");
const request = require("request");
const cors = require('cors');
const os = require('os');
const numCPUs = os.cpus().length;

const servers = Array.from({ length: numCPUs }, (_, i) => `http://localhost:${3000 + i}`);

let current = 0;

const handler = (req, res) => {
  const server = servers[current];
  req.pipe(request({ url: server + req.url })).pipe(res);

  current = (current + 1) % servers.length;
};

const server = express();

server.use(cors());
server.use((req, res) => handler(req, res));

server.listen(8080, err => {
  if (err) console.log("Failed to start server");
  else console.log("Load Balancer Server listening on PORT 8080");
});
