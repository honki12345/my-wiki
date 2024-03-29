# 모던 JavaScript 듀토리얼 day11

- 읽을파트: [파트 1 3.6] 폴리필, [파트 1 4.1] 객체
- 평가: 유익, 비교연산자 규칙이 어지러웠는데 과제문제풀이와 함정피하기로 핵심을 말해주어서 정리가 잘 되었다

---

## [파트 1 3.6] 폴리필

- 엔진이 표준 전체를 지원하지 않고 일부만 지원하는 건 흔한 일입니다
- 명세서(specification)에 등록된 기능보다 초안(draft)에 있는 제안을 먼저 구현하기로 결정하는 경우도 있습니다

### 바벨

- 바벨은 트랜스파일러(transpiler)로, 모던 자바스크립트 코드를 구 표준을 준수하는 코드로 바꿔줍니다
- 바벨의 역할
  - 트랜스파일러
    - 바벨은 코드를 재작성해주는 트랜스파일러 프로그램입니다
    - 바벨은 개발자의 컴퓨터에서 돌아가는데, 실행하면 기존 코드가 구 표준을 준수하는 코드로 변경됩니다
    - 변경된 코드는 웹사이트 형태로 사용자에게 전달됩니다
    - 웹팩과 같은 모던 프로젝트 빌드 시스템은 코드가 수정될 때마다 자동으로 트랜스파일러를 동작시켜줍니다
  - 폴리필
    - 폴리필이란 변경된 표준을 준수할 수 있게 기존 함수의 동작방식을 **수정**하거나, 새롭게 **구현**한 함수의 스크립트

## [파트 1 4.1] 객체

- 객체는 원시형과 달리 다양한 데이터를 담을 수 있습니다
- 키로 구분된 데이터 집합이나 복잡한 개체(entity)를 저장할 수 있습니다
- 객체는 중괄호 안에 '키(key):값(value)' 쌍으로 구성된 프로퍼티를 여러 개 넣을 수 있습니다
  - `키`엔 문자형, `값`엔 모든 자료형이 허용됩니다
- `delete` 연산자를 사용하면 프로퍼티를 삭제할 수 있습니다
- 여러 단어를 조합해 프로퍼티 이름을 만든 경우엔 프로퍼티 이름을 따옴표로 묶어줘야 합니다
- 마지막 프로퍼티 끝은 쉼표로 끝날 수 있습니다
  - 끝에 쉼표를 붙이면 모든 프로퍼티가 유사한 형태를 보이기 때문에 프로퍼티를 추가, 삭제, 이동하는게 쉬워집니다

### 대괄호 표기법

- 여러 단어를 조합해 프로퍼티 키를 만든 경우엔, 점 표기법을 사용해 프로퍼티 값을 읽을 수 없습니다
- 객체에서 점 표기법으로 접근은 키가 `유효한 변수 식별자`인 경우에만 사용할 수 있습니다
  - 유효한 변수 식별자: 공백이 없어야하고, 숫자로 시작하지 않아야하고, `$`와 `_`를 제외한 특수문자가 없어야합니다
- 키가 유효한 식별자가 아닌 경우엔 점 표기법 대신에 대괄호 표기법(square bracket notation)을 사용할 수 있습니다
- 대괄호 표기법 안에서 문자열을 사용할 땐 문자열을 따옴표로 묶어줘야합니다
- 대괄표 표기법을 사용하면 모든 표현식의 평가결과를 프로퍼티 키로 사용할 수 있습니다

### 계산된 프로퍼티(computed property)

- 객체를 생성할 때 객체 리터럴 안의 프로퍼티 키가 대괄호로 둘러싸여 있는 경우, 이를 계산된 프로퍼티라 한다

### 단축 프로퍼티

- (프로퍼티의 이름과 값)이 (변수의 이름)과 동일할 시 프로퍼티 값 단축 구문(property value shorthand)를 사용해 코드를 짧게 줄일 수 있습니다
- 일반 프로퍼티와 단축 프로퍼티를 함께 사용하는 것도 가능합니다

### 프로퍼티 이름의 제약 사항

- 변수 이름엔 예약어를 사용하면 안되지만 객체 프로퍼티엔 이런 제약이 없습니다
- 어떤 문자형, 심볼형 값도 프로퍼티 키가 될 수 있습니다
- 문자형이나 심볼형에 속하지 않은 값은 문자열로 자동 형 변환됩니다

### 'in' 연산자로 프로퍼티 존재 여부 확인하기

- 자바스크립트 객체는 존재하지 않은 프로퍼티에 접근하려 해도 에러가 발생하지 않고 `undefined`를 반환합니다
  - 이런 특징을 활용하면 프로퍼티 존재 여부를 쉽게 확인할 수 있습니다
- `undefined`와 비교하는 것 이외에도 연산자 `in`을 사용하면 프로퍼티 존재 여부를 확인할 수 있습니다
- `in` 왼쪽엔 반드시 프로퍼티 이름이 와야합니다. 프로퍼티 이름은 보통 따옴표로 감싼 문자열입니다

### 'for...in' 반복문

- `for...in` 반복문을 사용하면 객체의 모든 키를 순회할 수 있습니다

### 객체 정렬 방식

- 객체는 특별한 방식으로 정렬됩니다
  - 정수 프로퍼티는 자동으로 정렬되고, 그 외의 프로퍼티는 객체에 추가한 순서 그대로 정렬됩니다
  - 정수프로퍼티란 변형 없이 **정수**에서 왔다 갔다 할 수 있는 문자열을 의미합니다

### 객체의 종류

- 객체는 몇가지 특수한 기능을 가진 연관배열(associative array)입니다
- 객체의 종류
  - `Array`: 정렬된 데이터 컬렉션을 저장할 때 쓰임
  - `Date`: 날짜와 시간 정보를 저장할 때 쓰임
  - `Error`: 에러 정보를 저장할 때 쓰임
