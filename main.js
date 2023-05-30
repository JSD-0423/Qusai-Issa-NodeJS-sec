import { Book } from "./book.js";

let booksList = [];
booksList.push(new Book("javascript"));
booksList.push(new Book("css"));
booksList.push(new Book("html"));
booksList.push(new Book("game of throns"));

const jsonList = JSON.stringify(booksList);
console.log(jsonList);
