const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");
const dotnet = require("dotenv").config();
dns.setDefaultResultOrder("ipv4first");
const http = require("http");
const app = require("./app.js");
const { InitializeSocket } = require("./socketio.js");
const port = process.env.PORT || 3000;

const server = http.createServer(app);
InitializeSocket(server);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
