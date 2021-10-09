const { readFile } = require("fs").promises;

const getQuery = async path =>
  // allow paths to be referenced from root directory
  await readFile(__dirname + "/../" + path).then(buffer => buffer.toString());

module.exports = { getQuery };
