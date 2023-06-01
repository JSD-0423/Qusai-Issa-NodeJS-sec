import { createRequire } from "module";
const require = createRequire(import.meta.url);
const http = require("http");

import { Book } from "./services/book.js";
import { readJSONFile } from "./services/file.js";

let booksList = readJSONFile("books.json").data;
console.log(booksList);
console.log(booksList[0]);
//booksList.push(new Book("introduction to programming"));

const host = "localhost";
const port = 8000;

const requestHandler = (req, res) => {
  console.log(req.url);

  if (req.method === "GET" && req.url.startsWith("/books/")) {
    // handle the request here;
    const myid = Number(req.url.slice(7));

    res.writeHead(302, {
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify(booksList[myid]));

    //res.status(200).send({recipeNames})

    res.end();
  } else if (req.method === "GET" && req.url.startsWith("/books")) {
    // handle the request here;
    console.log("return all books");

    const myid = Number(req.url.slice(7));
    console.log(req.url);
    console.log(myid);
    return redirect(request, response, "books");
  } else if (req.method === "POST" && req.url.startsWith("/books/")) {
    console.log("creat a new book");

    // handle the request here;
    const boolName = Number(req.url.slice(7));
  }

  return "error";
};
const server = http.createServer(requestHandler);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
