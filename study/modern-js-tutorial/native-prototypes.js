Function.prototype.defer = function (ms) {
  setTimeout(this, ms);
};

function f() {
  alert('Hello');
}

f.defer(1000);

Function.prototype.defer = function (ms) {
  let f = this;
  return function (...args) {
    setTimeout(() => f.apply(this, args), ms);
  };
};

let user = {
  name: 'John',
  sayHi() {
    alert(this.name);
  },
};
