const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    throw new Error();
  }, 1000);
});
console.log(promise);
