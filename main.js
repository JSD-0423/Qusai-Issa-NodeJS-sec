import { createRequire } from "module";
const require = createRequire(import.meta.url);
const http = require("http");

import { Book } from "./services/book.js";
import { readJSONFile, updateFile } from "./services/file.js";

console.log("HI");

console.log(readJSONFile("books.json"));
let booksList = readJSONFile("books.json").data;
let errorMassage = "";

//booksList.push(new Book("introduction to programming"));

const host = "localhost";
const port = 8000;

const requestHandler = (req, res) => {
  console.log(req.url);

  if (req.method === "GET" && req.url.startsWith("/books/")) {
    // handle the request here;
    const myid = Number(req.url.slice(7));
    let bookIndex = getBookIndex(myid);
    if (bookIndex === 0 || bookIndex) {
      res.writeHead(302, {
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify(booksList[bookIndex]));
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.write("Sorry but we can't find that book");
    }
    //res.status(200).send({recipeNames})

    res.end();
  } else if (req.method === "GET" && req.url.startsWith("/books")) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    console.log("-------------------------");
    console.log(booksList);
    res.write(JSON.stringify(booksList));
    res.end();

    console.log("*********************");
  } else if (req.method === "POST" && req.url.startsWith("/books/")) {
    console.log("creat a new book");

    // handle the request here;
    const bookName = req.url.slice(7);
    let myid = creatBook(bookName);
    if (myid) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("the book was created successfully with id: " + myid);
    } else {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("there was an Error on the server: ");
    }
    res.end();
  }

  return "error";
};
const server = http.createServer(requestHandler);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

function getBookIndex(id) {
  console.log("myid " + id);

  for (let i = 0; i < booksList.length; i++) {
    console.log(i + ": " + booksList[i].id);

    if (booksList[i].id == id) {
      console.log("found at " + i);
      return i;
    }
  }
  console.log("not found ");
  return false;
}

function creatBook(name) {
  name = name.replace("-", " ");

  let book = new Book(generatId(), name);
  booksList.push(book);
  updateFile("books.json", booksList);

  return book.id;
}

function generatId() {
  let length = booksList.length;
  if (length == 0) {
    return 1;
  }
  let id = booksList[length - 1].id;
  id++;
  return id;
}
