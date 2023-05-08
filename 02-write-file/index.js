const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "output.txt");

const writeStream = fs.createWriteStream(filePath, {
  flags: "a",
});

process.stdin.setEncoding("utf8");

console.log(
  'Добро пожаловать! Введите текст. Для завершения введите "exit" или нажмите Ctrl + C'
);

process.stdin.on("readable", () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    const input = chunk.trim();
    if (input === "exit") {
      console.log("Программа завершена");
      writeStream.end();
      process.exit();
    } else {
      writeStream.write(input + "\n");
    }
  }
});

process.on("SIGINT", () => {
  console.log("Программа завершена");
  writeStream.end();
  process.exit();
});
