const camelize = (string) => {
  return string
    .split("-") // splits 'my-long-word' into ['my', 'long', 'word]
    .map((word, index) =>
      index === 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join("");
};
// console.log(camelize("background-color") == "backgroundColor");
// console.log(camelize("list-style-image") == "listStyleImage");
// console.log(camelize("-webkit-transition") == "WebkitTransition");

const filterRange = (arr, start, end) => {
  return arr.filter((item) => start <= item && item <= end);
};

let arr = [5, 3, 8, 1];
let filtered = filterRange(arr, 1, 4);

// console.log(filtered); // 3,1 (조건에 맞는 요소)
// console.log(arr); // 5,3,8,1 (기존 배열은 변경되지 않았습니다.)

const filterRangeInPlace = (arr, start, end) => {
  arr.forEach((element, index) => {
    if (element < start || element > end) arr.splice(index, 1);
  });
};

arr = [5, 3, 8, 1];
filterRangeInPlace(arr, 1, 4); // 1과 4 사이에 있지 않은 요소는 모두 제거함
// console.log(arr); // [3, 1]

arr = [5, 2, 1, -10, 8];

arr.sort((a, b) => b - a);
// 요소를 내림차순으로 정렬해주는 코드를 여기에 작성해보세요.

// console.log(arr); // 8, 5, 2, 1, -10

arr = ["HTML", "JavaScript", "CSS"];
const copySorted = (arr) => [...arr].sort();

let sorted = copySorted(arr);

// console.log(sorted); // CSS, HTML, JavaScript
// console.log(arr); // HTML, JavaScript, CSS (no changes)

function Calculator() {
  this.methods = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b,
  };

  this.calculate = function (str) {
    let split = str.split(" "),
      a = +split[0],
      op = split[1],
      b = +split[2];

    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return this.methods[op](a, b);
  };

  this.addMethod = function (name, func) {
    this.methods[name] = func;
  };
}

/* let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users = [john, pete, mary];

let names = users.map((element) => element.name); */

// console.log(names); // John, Pete, Mary

let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [john, pete, mary];

let usersMapped = users.map((element) => ({
  fullName: [users.name, users.surname].join(" "),
  id: users.id,
}));

usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 },
];

// console.log(usersMapped[0].id); // 1
// console.log(usersMapped[0].fullName); // John Smith

john = { name: "John", age: 25 };
pete = { name: "Pete", age: 30 };
mary = { name: "Mary", age: 28 };

arr = [pete, john, mary];

const sortByAge = (arr) => arr.sort((a, b) => a.age - b.age);

sortByAge(arr);

// now: [john, mary, pete]
console.log(arr[0].name); // John
console.log(arr[1].name); // Mary
console.log(arr[2].name); // Pete
