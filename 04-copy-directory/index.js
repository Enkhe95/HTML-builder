const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "files");
const targetDir = path.join(__dirname, "files-copy");

const copyFile = (file, srcDir, destDir) => {
  const sourcePath = path.join(srcDir, file);
  const destPath = path.join(destDir, file);
  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destPath);
  readStream.pipe(writeStream);
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) throw err;
    console.log(`File ${filePath} deleted`);
  });
};

const copyDirectory = (srcDir, destDir) => {
  fs.readdir(srcDir, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const sourcePath = path.join(srcDir, file);

      fs.stat(sourcePath, (err, stats) => {
        if (err) throw err;

        if (stats.isDirectory()) {
          fs.mkdir(path.join(destDir, file), { recursive: true }, (err) => {
            if (err) throw err;
            copyDirectory(path.join(srcDir, file), path.join(destDir, file));
          });
        } else {
          copyFile(file, srcDir, destDir);
        }
      });
    });
  });
};

// Создание папки files-copy
fs.mkdir(targetDir, { recursive: true }, (err) => {
  if (err) throw err;

  // Чтение содержимого папки files и копирование файлов в папку files-copy
  fs.readdir(sourceDir, (err, files) => {
    if (err) throw err;

    const filesToCopy = files.filter((file) => {
      const sourcePath = path.join(sourceDir, file);
      const stats = fs.statSync(sourcePath);
      return stats.isFile();
    });

    // Копирование файлов
    filesToCopy.forEach((file) => {
      copyFile(file, sourceDir, targetDir);
    });

    // Удаление лишних файлов
    fs.readdir(targetDir, (err, files) => {
      if (err) throw err;

      const filesToDelete = files.filter((file) => !filesToCopy.includes(file));

      filesToDelete.forEach((file) => {
        const filePath = path.join(targetDir, file);
        deleteFile(filePath);
      });
    });
  });
});

console.log("Копирование завершено");
