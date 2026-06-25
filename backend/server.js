const http = require("http");
const app = require("./app.js");
const { InitializeSokect } = require("./socketio.js");
const port = process.env.PORT || 3000;

const server = http.createServer(app);
InitializeSokect(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
