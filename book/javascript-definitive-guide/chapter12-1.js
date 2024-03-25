/* 
from 이상 to 이하인 숫자 x의 범위를 표현하는 Range 객체
Range 클래스에는 주어진 숫자가 범위에 들어가는지 테스트하는 has() 메서드가 있습니다.
Range 클래스는 이터러블이며 범위안에 있는 정수를 순회합니다 */
class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  //   Range를 숫자로 구성된 세트처럼 동작하게 만듭니다
  has(x) {
    return typeof x === "number" && this.from <= x && x <= this.to;
  }

  //   세트 표기법을 사용해 범위의 문자열 표현을 반환합니다.
  toString() {
    return `{x | ${this.from} <= x <= ${this.to}}`;
  }

  //   이터레이터 객체를 반환해서 Range를 이터러블로 만듭니다
  // 메서드 이름은 문자열이 아니라 특별한 심벌입니다
  [Symbol.iterator]() {
    // 각 이터레이터 인스턴스는 반드시 다른 인스턴스에 독립적으로 순회해야 합니다
    // 따라서 현재 위치를 추적할 상태 변수가 필요합니다
    // from 보다 크거나 같은 첫번째 정수에서 시작합니다
    let next = Math.ceil(this.from); // 반환할 다음 값입니다
    let last = this.to; // to를 초과하는 값은 반환하지 않습니다
    return {
      // next() 메서드가 이터레이터 객체의 핵심입니다
      // 이 메서드는 반드시 순회 결과 객체를 반환해야 합니다
      next() {
        return next <= last // 마지막 값을 아직 반환하지 않았다면
          ? { value: next++ } // 다음 값을 반환하고 증가시킵니다
          : { done: true }; // 그렇지 않다면 마지막 값을 반환했다고 알립니다
      },

      //   편의를 위해 이터레이터 자체를 이터러블로 만듭니다
      [Symbol.iterator]() {
        return this;
      },
    };
  }
}

for (let x of new Range(1, 10)) console.log(x);
[...new Range(-2, 2)];

// f()를 소스 이터러블의 각 값에 호출한 결과를 순회하는 이터러블 객체를 반환합니다
function map(iterable, f) {
  let iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let v = iterator.next();
      if (v.done) {
        return v;
      } else {
        return { value: f(v.value) };
      }
    },
  };
}

function words(s) {
  var r = /\s+|$/g; // 하나 이상의 스페이스와 일치합니다
  r.lastIndex = s.match(/[^ ]/).index; // 스페이스가 아닌 첫번째 위치에서 검색을 시작합니다
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let start = r.lastIndex;
      if (start < s.length) {
        let match = r.exec(s);
        if (match) {
          return { value: s.substring(start, match.index) };
        }
      }
      return { done: true };
    },
  };
}

// 한 자리 소수를 전달하는 제너레이터 함수
function* oneDigitPrimes() {
  // 이 함수를 호출해도 코드를 실행하지는 않습니다
  yield 2; // 대신 제너레이터 객체를 반환합니다
  yield 3; // 제너레이터의 next() 메서드를 호출하면
  yield 5; // next() 메서드의 반환 값을 제공하는
  yield 7; // yield 문을 만날 때까지 코드를 실행합니다
}
