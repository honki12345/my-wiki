let user = {
  name: "John",
  years: 30,
};

const { name, years: age, isAdmin = false } = user;

// console.log(name); // John
// console.log(age); // 30
// console.log(isAdmin); // false

let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

const topSalary = (obj = null) => {
  if (obj === null) return null;

  let maxValue;
  let maxKey;
  for (const [key, value] of Object.entries(obj)) {
    if (!maxValue || value > maxValue) {
      maxValue = value;
      maxKey = key;
    }
  }
  return [maxKey, maxValue];
};
