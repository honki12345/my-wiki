# 모던 JavaScript 듀토리얼 day02

## [파트 1 2.1] Hello, world

### 'script' 태그

- `<script>`태그엔 자바스크립트 코드가 들어갑니다. 브라우저는 이 태그를 만나면 안의 코드를 자동으로 처리합니다

### 외부 스크립트

- 스크립트를 별도의 파일에 작성하면 브라우저가 스크립트를 다운받아 캐시에 저장하기 때문에 성능상의 이점이 있습니다
  - 여러 페이지에서 동일한 스크립트를 사용하는 경우, 브라우저는 페이지가 바뀔 때마다 스크립트를 새로 다운받지 않고 캐시로부터 스크립트를 가져와 사용합니다. 즉, 스크립트 파일을 한 번만 다운받으면 됩니다
- `src` 속성이 있으면 태그 내부의 코드는 무시됩니다

## [파트 1 2.3] 엄격 모드

- ES5에서는 기존 기능 중 일부가 변경되었습니다. 기존 기능이 변경되었기에 하위 호환성 문제가 생길 수 있습니다.
  그래서 변경사항 대부분은 ES5의 **기본모드**에선 활성화되지 않도록 설계되었습니다.
  대신 `use strict`라는 지시자를 사용해 엄격 모드를 활성화 했을 때만 이 변경사항이 활성화되게 해놓았습니다

### use strict

- `"use strict"` 문자열이 스크립트 최상단에 오면 스크립트 전체가 "모던한" 방식으로 동작합니다
- `"use strict"`이 함수 본문 맨 앞에 오면 오직 해당 함수만 엄격모드로 실행됩니다
- `use strict`를 취소할 방법은 없습니다
- '클래스'와 '모듈'을 사용하면 `use strict`가 자동으로 적용됩니다

## [파트 1 2.4] 변수와 상수

- 변수는 사용자나 서버로부터 입력받은 정보를 저장하는 용도로 사용됩니다

### 상수

- 상수는 코드가 실행되기 전에 이미 그 값을 알고 있는 상수도 있고, 런타임 과정에서 계산되지만 최초 할당 이후 값이 변하지 않는 상수도 있습니다
  - 대문자 상수(대문자 + `_`)는 '하드 코딩한' 값의 별칭을 만들 때 사용합니다

### 바람직한 변수명

- 변수 명명시 참고하기 좋은 규칙
  - 사람이 읽고 이해할 수 있는 이름을 사용하세요
  - 무엇을 하고 있는지 명확히 알고 있지 않을 경우 외에는 줄임말이나 짧은 이름은 피하세요
  - 최대한 서술적이고 간결하게 명명해주세요
  - 자신만의 규칙이나 소속된 팀의 규칙을 따르세요

## [파트 1 2.5] 자료형

- 자료의 타입은 있지만 값의 타입은 언제든지 바꿀 수 있는 언어를 동적언어(dynamically typed) 언어라고 부릅니다

### 숫자형

- 숫자형은 정수 및 부동소수점 숫자를 나타냅니다
  - `Infinity`는 무한대를 나타냅니다.
    어느 숫자든 0으로 나누면 무한대를 얻을 수 있습니다
  - `NaN`은 계산 중에 에러가 발생했다는 것을 나타내주는 입니다
    부정확하거나 정의되지 않은 수학연산을 사용하면 계산 중 에러가 발생합니다
    `NaN`에 어떤 추가 연산을 해도 결국 `NaN`이 반환됩니다

### 'null' 값

- `null` 값은 오로지 `null`값만 포함하는 별도의 자료형을 만듭니다
- 자바스크립트에서 `null`은 존재하지 않는(nothing) 값, 비어있는(empty) 값, 알 수 없는(unknown) 값을 나타내는데 사용

### 'undefined' 값

- `undefined` 값은 오로지 `undefined`값만 포함하는 별도의 자료형을 만듭니다
- `undefined`는 값이 할당되지 않은 상태를 나타낼 때 사용합니다
- 변수를 선언했지만, 값을 할당하지 않았다면 해당 변수에 `undefined`가 자동으로 할당됩니다

### typeof 연산자

- `typeof` 연산자는 인수의 자료형을 나타내는 문자열을 반환합니다
- `typeof` 연산자는 두 가지 형태의 문법을 지원합니다
  - 1. 연산자: `typeof x`
  - 2. 함수: `typeof(x)`
- 오류
  - `null`은 별도의 고유한 자료형을 가지는 특수값이지만 `tyopeof` 결과 "object"를 반환합니다
  - 함수는 객체형("object")에 속하지만 `typeof` 결과 "function"을 반환합니다

## [파트 1 2.6] alert, prompt, confirm을 이용한 상호작용

- 브라우저 환경에서 사용하는 사용자 인터페이스 기능: `alert`, `prompt`, `confirm`

### alert

- 이 함수가 실행되면 사용자가 확인(OK) 버튼을 누를 때까지 메시지를 보여주는 창이 계속 떠있게 된다
- 메시지가 있는 작은 창은 *모달창(modal window)*라고 합니다
  - '모달'이란 단어는 페이지의 나머지 부분과 상호작용이 불가능하다는 의미가 내포되어 있습니다
  - 따라서 사용자는 모달 창 바깥에 있는 버튼을 누른다든가 하는 행동을 할 수 없습니다

### prompt

- prompt(title, [default])
  - title: 사용자에게 보여줄 문자열
  - default: 입력 필드의 초깃값(선택값)
- 함수가 실행되면 텍스트 메시지와 입력필드, 확인 및 취소 버튼이 있는 _모달_ 창을 띄워줍니다
- `prompt`함수는 사용자가 입력 필드에 기재한 문자열을 반환합니다. 사용자가 입력을 취소한 경우는 `null`이 반환됩니다

### 컨펌 대화상자

- confirm(question);
- `confirm` 함수는 매개변수로 받은 `question(질문)`과 확인 및 취소 버튼이 있는 모달 창을 보여줍니다
- 사용자가 확인을 누르면 `true`, 그 외의 경우는 `false`를 반환합니다

## [파트 1 2.7] 형 변환

- 형변환의 예시
  - `alert`은 문자열로 자동변환해서 보여준다
  - 수학관련연산자는 숫자로 변환한다
- 문자형으로 변환
  - e.g. `false` -> `"false"`, `null` -> `"null"`
- 숫자형으로 변환
  - `undefined` -> `NaN`
  - `null` -> `0`
  - `true and false` -> `1`과 `0`
  - `string` -> 1. 처음과 끝 공백이 제거됩니다. 공백 제거후 남아있는 문자열이 없다면 0, 변환에 실패하면 `NaN`
- 불린형으로 변환
  - 숫자, `0`, 빈 문자열, `null`, `undefined`, `NaN`은 false
  - 그외는 true (e.g. "0" -> true)

## [파트 1 2.8] 기본 연산자와 수학

- 용어
  - 피연산자(operand): 연산자가 연산을 수행하는 대상, 인수(argument)라고도 불린다
- 나머지 연산자(remainder operator) %
- 거듭제곱 연산자(exponentiation operator) \*\*
  - `a ** b` -> a를 b번 곱한 값
- 이항 연산자 `+`와 문자열연결
  - 이항 연산자 `+`의 피연산자로 문자열이 전달되면 문자열을 병합(연결) 합니다
  - 피연산자 중 하나가 문자열이면 다른 하나도 문자열로 변환됩니다
  - 다른 산술연산자는 피연산자가 숫자형이 아닌 경우 그 형을 숫자형으로 바꾸는 반면, `+`연산자는 문자열이 있으면 나머지도 문자열로 변환합니다
- 단항 연산자 `+`와 숫자형으로의 변환
  - 피연산자가 숫자가 아닌 경우엔 숫자형으로 변환이 일어납니다
  - `Number(...)`와 동일한 역할을 해줍니다
- 연산자 우선순위
  - 하나의 표현식에 둘 이상의 연산자가 있는 경우, 실행 순서는 연산자의 우선순위에 의해 결정됩니다
- 할당연산자 `=`
  - 할당(assignment) 연산자는 우선순위가 `3`으로 낮습니다
  - `=`는 연산자이기 때문에 값을 반환합니다
  - 할당 연산자를 여러 개 연결한 경우, 평가는 우측부터 진행됩니다
- 복합 할당 연산자
  - 연산 우선순위가 할당연산자와 동일합니다
- 증가 감소 연산자
  - 전위형은 증가,감소 후의 새로운 값을 반환하는 반면, 후위형은 증가, 감소 전의 기존값을 반환합니다
- 비트연산자(bitwise operator)
  - 비트연산자는 인수를 32비트 정수로 변환하여 이진 연산을 수행합니다
- 쉼표 연산자(comma operator)
  - 여러 표현식을 코드 한 줄에서 평가할 수 있게 해줍니다. 이때 표현식 각각이 모두 평가되지만, 마지막 표현식의 평가결과만 반환됩니다