function promisify(f) {
  return function (...args) {
    // 래퍼 함수를 반환함
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        // f에 사용할 커스텀 콜백
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // 위에서 만든 커스텀 콜백을 함수 f의 인수 끝에 추가합니다

      f.call(this, ...args); // 기존 함수를 호출합니다
    });
  };
}

// 콜백의 성공 결과를 담은 배열을 얻게 해주는 promisify(f, true)
function promisify2(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) {
        // f에 사용할 커스텀 콜백
        if (err) {
          reject(err);
        } else {
          // manyArgs가 구체적으로 명시되었다면, 콜백의 성공 케이스와 함께 이행상태가 됩니다
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);
      f.call(this, ...args);
    });
  };
}
