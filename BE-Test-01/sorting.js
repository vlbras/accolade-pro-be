const fs = require("fs").promises;
const path = require("path");

const INPUT_DIR = "./input";
const OUTPUT_DIR = "./output";

const validateInputs = (files, method) => {
  const methods = ["name", "extension"];
  if (!methods.includes(method)) {
    throw new Error("Method is not valid");
  }

  if (!Array.isArray(files) || files.length === 0) {
    throw new Error("Array is not valid");
  }
};

const ensureDir = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch (error) {
    await fs.mkdir(dirPath);
  }
};

const moveFile = async (source, destination) => {
  try {
    await fs.rename(source, destination);
  } catch (error) {
    throw new Error(`Failed to move file: ${error.message}`);
  }
};

const groupFiles = async (files, method) => {
  const groups = {};
  const index = method === "name" ? 0 : 1;

  await ensureDir(OUTPUT_DIR);

  for (const file of files) {
    const parts = file.split(".");
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      throw new Error(`File is not valid: ${file}`);
    }

    const key = parts[index];
    if (!groups[key]) {
      groups[key] = [];
      await ensureDir(path.join(OUTPUT_DIR, key));
    }
    groups[key].push(file);

    const sourcePath = path.join(INPUT_DIR, file);
    const destinationPath = path.join(OUTPUT_DIR, key, file);

    moveFile(sourcePath, destinationPath);
  }

  return Object.values(groups);
};

module.exports = sorting = async (files, method) => {
  validateInputs(files, method);

  const startTime = Date.now();
  const result = await groupFiles(files, method);
  const endTime = Date.now();

  console.log(result, `Execution took ${endTime - startTime}ms`);
};
