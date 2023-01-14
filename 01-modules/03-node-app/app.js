var http = require("http");

var server = http.createServer(function (req, res) {
  if (req.url === "/") {
    res.write("Hello world");
    res.end();
  }

  if (req.url === "/api/course") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

/* server.on("connection", (socket) => {
  console.log("New Connection...");
}); */

server.listen(3000);

console.log("listening on port 3000...");
