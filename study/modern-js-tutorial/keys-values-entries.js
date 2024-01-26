let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

const sumSalaries = (obj) => {
  // return Object.values(obj).reduce((a, b) => a + b, 0);

  let sum = 0;
  for (const value of Object.values(obj)) {
    // console.log(value);
    sum += value;
  }
  return sum;
};

// console.log(sumSalaries(salaries)); // 650

let user = {
  name: "John",
  age: 30,
};

const count = (obj) => Object.keys(obj).length;

console.log(count(user)); // 2
