const app = require("./app");
const http = require("http");
const socketIo = require("socket.io");
const port = normalizePort(process.env.PORT || "5000");
const List = require("./db/models").List;
app.set("port", port);

const server = http.createServer(app);
const io = socketIo(server);

server.listen(port);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}





io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getListEntriesAndEmit(socket),
    10000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});


const getListEntriesAndEmit = socket => {
  List.findAll({
    attributes: ['item', 'purchased', 'id']
  })
  .then((lists) => {
    socket.emit("listEntriesDatabase", {lists});
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  })


};





server.on("listening", () => {
  console.log(`server is listening for requests on port ${server.address().port}`);
});
