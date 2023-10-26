const validateInput = (arr, el) => {
  if (!Array.isArray(arr)) {
    throw new Error("First argument must be an array");
  }

  if (arr.length === 0) {
    throw new Error("First argument must not be an empty array");
  }

  if (typeof el !== "number" || isNaN(el)) {
    throw new Error("Second argument must be a number");
  }
};

const freqCount = (arr, el) => {
  validateInput(arr, el);

  const counts = new Map();

  const helper = (subArr, level) => {
    if (!counts.has(level)) counts.set(level, 0);

    for (const item of subArr) {
      if (Array.isArray(item)) {
        helper(item, level + 1);
      } else if (item === el) {
        counts.set(level, counts.get(level) + 1);
      }
    }
  };

  helper(arr, 0);

  const result = [...counts.entries()];
  console.log(result);
};

freqCount([1, 4, 4, [1, 1, [1, 2, 1, 1]]], 1); // [[0, 1], [1, 2], [2, 3]]
freqCount([1, 5, 5, [5, [1, 2, 1, 1], 5, 5], 5, [5]], 5); // [[0, 3], [1, 4], [2, 0]]
freqCount([1, [2], 1, [[2]], 1, [[[2]]], 1, [[[[2]]]]], 2); // [[0, 0], [1, 1], [2, 1], [3, 1], [4, 1]]
