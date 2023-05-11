const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "secret-folder");

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(`Error reading folder: ${err}`);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(`Error reading file ${filePath}: ${err}`);
        return;
      }

      if (stats.isFile()) {
        const fileSizeInKb = stats.size / 1024;
        const fileExtension = path.extname(filePath).replace(".", "");

        console.log(
          `${file.replace(
            /\.[^/.]+$/,
            ""
          )}-${fileExtension}-${fileSizeInKb.toFixed(3)}kb`
        );
      }
    });
  });
});
