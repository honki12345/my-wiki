function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () =>
    callback(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

  document.head.append(script);
}

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`${src} error`));

    document.head.append(script);
  });
}

let promise = loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"
);

promise.then(
  (script) => console.log(`${script.src} load`),
  (error) => console.log(`${error.message} load`)
);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

delay(3000).then(() => console.log("3초 후 실행"));
