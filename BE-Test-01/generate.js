const fs = require("fs");

const generate = (n) => {
  const files = [];
  const extensions = ["html", "js", "txt"];

  for (let i = 0; i < n; i++) {
    const expression = Math.floor(Math.random() * 3);
    const file = `ex${i + 1}.${extensions[expression]}`;

    files.push(file);

    fs.writeFileSync(`./input/${file}`, "<>Hello World</>");
  }

  console.log(files);
};

generate(4);
