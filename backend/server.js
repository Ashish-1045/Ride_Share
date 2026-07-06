const dotnet = require("dotenv").config(); 
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
const http = require("http");
const app = require("./app.js");
const { InitializeSocket} = require("./socketio.js");
const port = process.env.PORT || 3000;

const server = http.createServer(app);
InitializeSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
