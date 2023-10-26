const sorting = require("./sorting");

const mockFiles = [
  "ex1.html",
  "ex1.js",
  "ex1.txt",
  "ex2.html",
  "ex2.js",
  "ex2.txt",
];

sorting(mockFiles, "name");

// reset the files before running the next test and comment out the previous test
// sorting(mockFiles, "extension");
