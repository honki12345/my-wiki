# 모던 JavaScript 듀토리얼 day07(12.28)

- 읽을파트: [파트 1 2.16] 함수 표현식, [파트 1 2.17] 화살표 함수 기본

- 평가: 보통, 복습하는 시간을 가졌다. 화살표함수기본은 간단한 기본 문법이라 따로 기록하지 않았다

---

## [파트 1 2.16] 함수 표현식

- 자바스크립트에서 함수는 **값**입니다. 따라서 함수도 값처럼 할당, 복사, 선언할 수 있습니다
  - 다른 언어처럼 **구조**로 취급하지 않습니다
- 함수만들기
  - 함수선언(Function Declaration): 함수가 독립된 구문형태로 존재하게 됩니다
  - 함수표현식(Function Expression): 함수가 표현식의 일부로 존재하게 됩니다

### 함수표현식 vs 함수선언문

- 자바스크립트 엔진이 _언제_ 함수를 생성하는가
  - 함수표현식은 실제 실행 흐름이 해당 함수에 도달했을 때 함수를 생성합니다
  - 함수선언문은 자바스크립트는 스크립트를 실행하기 전, 준비단계에서 전역에 선언된 함수 선언문을 찾고, 해당 함수를 생성합니다
- 스코프
  - 엄격모드에서 함수 선언문이 코드 블록 내에 위치하면 해당 함수는 블록 내 어디서든 접근할 수 있습니다. 반면 블록 밖에서는 함수에 접근하지 못합니다
