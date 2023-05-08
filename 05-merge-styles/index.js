const fs = require("fs");
const path = require("path");

const stylesDir = path.join(__dirname, "styles");
const bundleFile = path.join(__dirname, "project-dist", "bundle.css");

async function bundleStyles() {
  try {
    const files = await fs.promises.readdir(stylesDir);
    const cssFiles = files.filter((file) => path.extname(file) === ".css");
    let contents = [];
    for (let i = 0; i < cssFiles.length; i++) {
      const file = cssFiles[i];
      const filePath = path.join(stylesDir, file);
      const data = await fs.promises.readFile(filePath, "utf-8");
      contents.push(data);
    }
    await fs.promises.writeFile(bundleFile, contents.join("\n"), "utf-8");
    console.log("Стили успешно добавлены в bundle.css");
  } catch (err) {
    console.error("Error. Стили не добавлены:", err);
  }
}

bundleStyles();
