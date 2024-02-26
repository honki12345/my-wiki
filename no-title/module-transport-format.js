// 서버 사이드에서 사용하는 모듈
// complex-numbers/plus-two.js

var sum = require('./math').sum;
exports.plusTwo = function (a) {
  return sum(a, 2);
};

// 브라우저에서 사용하는 모듈
// complex-numbers/plus-two.js

require.define({
  'complex-numbers/plus-two': function (require, exports) {
    // 콜백 함수 안에 모듈을 정의한다
    var sum = require('./complex-number').sum;
    exports.plusTwo = function (a) {
      return sum(a, 2);
    };
  }['complex-numbers/math'],
});
