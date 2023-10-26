const fs = require("fs").promises;
const path = require("path");

const INPUT_DIR = "./input";
const OUTPUT_DIR = "./output";

const reset = async () => {
  const folders = await fs.readdir(OUTPUT_DIR);
  for (const folder of folders) {
    const folderPath = path.join(OUTPUT_DIR, folder);
    const files = await fs.readdir(folderPath);

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const destinationPath = path.join(INPUT_DIR, file);

      await fs.rename(filePath, destinationPath);
    }
    await fs.rmdir(folderPath);
  }
};

reset()
  .then(() => console.log("Reset complete"))
  .catch((error) => console.error(error.message));
