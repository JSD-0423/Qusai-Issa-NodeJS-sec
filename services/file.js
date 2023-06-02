import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require("fs");
const path = require("path");

export function readJSONFile(fileName) {
  const relativePath = path.relative("./", `data/${fileName}`);

  if (!fs.existsSync(relativePath)) {
    fs.writeFileSync(relativePath, "[]", "utf8");
    return { data: [], status: 201 };
  }

  const fileContents = fs.readFileSync(relativePath, "utf8");
  return { data: JSON.parse(fileContents), status: 200 };
}

export function updateFile(fileName, data) {
  const relativePath = path.relative("./", `data/${fileName}`);
  data = JSON.stringify(data);
  fs.writeFileSync(relativePath, data);
  console.log("File Created Successfully");
}
