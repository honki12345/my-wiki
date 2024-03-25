Promise.all([
  new Promise((resolve) =>
    setTimeout(() => {
      return resolve(1);
    }, 3000)
  ),
  new Promise((resolve) =>
    setTimeout(() => {
      return resolve(2);
    }, 2000)
  ),
  new Promise((resolve) =>
    setTimeout(() => {
      return resolve(3);
    }, 1000)
  ),
]).then(console.log);

let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/Violet-Bora-Lee",
  "https://api.github.com/users/jeresig",
];

// fetch를 사용해 url을 프라미스로 매핑합니다
let requests = urls.map((url) => fetch(url));

// Promise.all 은 모든 작업이 이행될 때까지 기다립니다
Promise.all(requests).then((responses) =>
  responses.forEach((response) =>
    console.log(`${reponse.url}: ${response.status}`)
  )
);

let names = ["iliakan", "Violet-Bora-Lee", "jeresig"];
let requests2 = names.map((name) =>
  fetch(`https://api.github.com/users/${name}`)
);
Promise.all(requests2)
  .then((responses) => {
    // 모든 응답이 성공적으로 이행되었습니다
    for (let response of responses) {
      console.log(`${response.url}: ${response.status}`);
    }

    return responses;
  })
  // 응답 메시지가 담긴 배열을 resonse.json()로 매핑해, 내용을 읽습니다
  .then((responses) => Promise.all(resonses.map((r) => r.json())))
  // JSON 형태의 응답 메시지는 파싱되어 배열 'users'에 저장됩니다
  .then((users) => users.forEach((user) => console.log(user.name)));
