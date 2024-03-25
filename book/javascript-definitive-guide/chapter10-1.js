const BitSet = (function () {
  // BitSet을 반환합니다
  // 비공개 세부 사항
  function isValid(set, n) {}
  function has(set, byte, bit) {}
  const BITS = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
  const MASKS = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);

  //   모듈의 공개 API는 여기서 정의하고 반환하는 BitSet 클래스 뿐입니다
  // 위에서 정의한 비공개 함수와 상수는 BitSet 클래스만 사용할 수 있고
  // 클래스 사용자에게는 보이지 않습니다
  return class BitSet extends AbstractWritableSet {};
})();

// 다음과 같이 통계모듈을 정의합니다
const stats = (function () {
  // 모듈에서만 사용하는 비공개 유틸리티 함수
  const sum = (x, y) => x + y;
  const square = (x) => x * x;

  //   내보낼 공개 함수
  function mean(data) {
    return data.reduce(sum) / data.length;
  }

  //   내보낼 공개함수
  function stddev(data) {
    let m = mean(data);
    return Math.sqrt(
      data
        .map((x) => x - m)
        .map(square)
        .reduce(sum) /
        (data.length - 1)
    );
  }

  return { mean, stddev };
})();

const modules = {};
function require(moduleName) {
  return modules[moduleName];
}

modules["sets.js"] = (function () {
  const exports = {};

  // sets.js 파일 내용이 여기에 들어갑니다
  exports.BitSet = class BitSet {};

  return exports;
})();

modules["stats.js"] = (function () {
  const exports = {};

  // stats.js 파일 내용이 여기 들어갑니다
  const sum = (x, y) => x + y;
  const square = (x) => x * x;
  exports.mean = function (data) {};
  exports.stddev = function (data) {};

  return exports;
})();
