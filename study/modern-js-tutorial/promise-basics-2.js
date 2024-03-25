let promise = new Promise(function (resolve, reject) {
  // 프라미스가 만들어지면 executor 함수는 자동으로 실행됩니다

  // 1초 뒤에 일이 성공적으로 끝났다는 신호가 전달되면서 result는 '완료'가 됩니다
  setTimeout(() => resolve("완료"), 1000);
});

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error());

    document.head.append(script);
  });
}

let promise2 = loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"
);
promise2.then(
  (script) => console.log("resolve"),
  (error) => console.log("error")
);

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
})
  .then((result) => {
    console.log(result); // 1
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then((result) => {
    console.log(result); // 2
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(result * 2);
      }, 1000);
    });
  })
  .then((result) => {
    console.log(result); // 4
  });

class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    console.log(resolve); // function() {네이티브 코드}
    // 1초 후 this.num * 2 와 함께 이행됨
    setTimeout(() => {
      return resolve(this.num * 2);
    }, 1000);
  }
}

new Promise((resolve) => resolve(1))
  .then((result) => {
    return new Thenable(result);
  })
  .then(console.log);

fetch("/article/promise-chaining/user.json")
  // 원격 서버가 응답하면 .then 아래 코드가 실행됩니다
  .then((response) => {
    // response.text() 는 응답 텍스트 전체가 다운로드 되면
    // 응답 텍스트를 새로운 이행 프라미스를 만들고, 이를 반환합니다
    return response.text();
  })
  .then((text) => {
    console.log(text);
  });

// user.json 에 요청을 보냅니다
fetch("/article/promise-chaining/user.json")
  // 응답받은 내용을 json 으로 불러옵니다
  .then((response) => response.json())
  // GitHub에 요청을 보냅니다
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  // 응답받은 내용을 json 형태로 불러옵니다
  .then((response) => response.json())
  // 3초간 아바타 이미지(githubUser.avatar_url)을 보여줍니다
  .then((githubUser) => {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);
    setTimeout(() => {
      return img.remove();
    }, 3000);
  });
