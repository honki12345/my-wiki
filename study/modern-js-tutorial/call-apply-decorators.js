function work(a, b) {
  alert(a + b);
}

work = spy(work);

work(1, 2);
work(4, 5);

for (let args of work.calls) {
  alert("call:" + args.join());
}

function spy(func) {
  function wrapper(...args) {
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = [];
  return wrapper;
}

function f(x) {
  alert(x);
}

let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

function delay(f, ms) {
  return function () {
    setTimeout(() => {
      f.apply(this, arguments);
    }, ms);
  };
}
