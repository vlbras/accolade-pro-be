const validateInputs = (files, method) => {
  const methods = ["name", "extension"];
  if (!methods.includes(method)) {
    throw new Error("Method is not valid");
  }

  if (!Array.isArray(files) || files.length === 0) {
    throw new Error("Array is not valid");
  }
};

const sorting = (files, method) => {
  const startTime = Date.now();

  validateInputs(files, method);

  const groups = {};

  for (const file of files) {
    const lastIndex = file.lastIndexOf(".");
    
    if (lastIndex === -1) {
      throw new Error(`File is not valid: ${file}`);
    }
    
    const [name, extension] = file.split(/\.(?=[^.]+$)/);
    const key = method === "name" ? name : extension;

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(file);
  }

  const result = Object.values(groups);
  const endTime = Date.now();

  console.log(result, `Execution took ${endTime - startTime}ms`);
};

const mockFiles = [
  "ex1.test.html",
  "ex1.test.js",
  "ex1.test.txt",
  "ex1.html",
  "ex1.js",
  "ex1.txt",
  "ex2.html",
  "ex2.js",
  "ex2.txt",
];

sorting(mockFiles, "name");
sorting(mockFiles, "extension");
