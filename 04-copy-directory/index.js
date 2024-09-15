const fs = require("fs");
const path = require("path");

const copyFiles = async () => {
  const filesDir = path.join(__dirname, "files");
  const filesCopyDir = path.join(__dirname, "files-copy");

  try {
    await fs.promises.access(filesCopyDir);
  } catch (err) {
    await fs.promises.mkdir(filesCopyDir);
  }

  const files = await fs.promises.readdir(filesDir);
  const filesCopy = await fs.promises.readdir(filesCopyDir);

  // Копирование новых и обновление существующих файлов
  for (const file of files) {
    const source = path.join(filesDir, file);
    const destination = path.join(filesCopyDir, file);

    if (filesCopy.includes(file)) {
      await fs.promises.unlink(destination);
    }

    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);
    readStream.pipe(writeStream);
  }

  // Удаление лишних файлов
  for (const fileCopy of filesCopy) {
    if (!files.includes(fileCopy)) {
      const fileCopyPath = path.join(filesCopyDir, fileCopy);
      await fs.promises.unlink(fileCopyPath);
    }
  }

  console.log("Копирование файлов успешно завершено");
};

copyFiles();
