const sumTo1 = (n) => {
  let sum = 0;
  while (n > 0) {
    sum += n--;
  }
  return sum;
};

// console.log(sumTo1(100));

const sumTo2 = (n) => {
  if (n == 1) return 1;
  else {
    return n + sumTo2(n - 1);
  }
};

// console.log(sumTo2(100000));

const factorial = (n) => {
  if (n == 1) return 1;
  else {
    return n * factorial(n - 1);
  }
};

// console.log(factorial(5));

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

function printListReverse2(list) {
  while(list.next)
}

function printListReverse(list) {
  if (list.next) printListReverse(list.next);
  console.log(list.value);
}

printListReverse(list);

function printList(list) {
  console.log(list.value);
  if (list.next) printList(list.next);
}

function printList2(list) {
  do {
    console.log(list.value);
    list = list.next;
  } while (list);
}

printList(list);
printList2(list);
