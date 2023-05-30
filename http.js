const http = require("http");

const host = "localhost";
const port = 8000;

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end("this is my server");
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

/*
booksList = [
  { id: 1, name: "intro to javaScript" },
  { id: 2, name: "intro to CSS" },
];
*/
