# 2.4 향상된 비동기 프로그래밍 1: 프로미스

- 프로미스는 **비동기 상태를 값**으로 다룰 수 있는 객체다
- 프로미스를 사용하면 비동기 프로그래밍을 순차적으로 작성할 수 있다

## 프로미스의 세가지 상태

- 세가지 상태
  - 대기 중(pending): 결과를 기다리는 중
  - 이행됨(fulfilled): 수행이 정상적으로 끝났고 결괏값을 가지고 있음
  - 거부됨(rejected): 수행이 비정상적으로 끝났음
- 이행됨, 거부됨 상태를 처리됨(settled) 상태라고 부른다
  - 프로미스는 처리됨 상태가 되면 다른 상태로 변경되지 않는다
  - 대기 중 상태일 때만 이행됨 또는 거부됨 상태로 변할 수 있다

## 프로미스를 생성하는 방법

- `new` 키워드를 사용해서 프로미스 생성하기
  - 생성된 프로미스는 대기 중 상태가 된다
  - 생성자에 입력되는 함수는 `resolve`와 `reject`라는 콜백 함수를 매개변수로 갖는다
    - 비동기로 어떤 작업을 수행 후 성공했을 때 `resolve`를 호출하고, 실패했을 때 `reject`를 호출한다
    - `resolve`를 호출하면 이행됨 상태가 된다
    - `reject`를 호출하면 거부됨 상태가 된다
    - 생성자에 입력된 함수에서 예외가 발생하면 거부됨 상태가 된다
  - 프로미스를 생성하는 순간 생성자에 입력된 함수는 실행된다
- `Promise.reject`를 호출하면 거부됨 상태인 프로미스가 생성된다
- `Promise.resolve`를 호출시 입력값이 프로미스라면 그 객체가 그대로 반환되고,
  프로미스가 아니라면 그 값 그대로 이행됨 상태인 프로미스가 반환된다

## then

- `then`은 처리됨(settled) 상태가 된 프로미스를 처리할 때 사용된다
- 프로미스가 처리됨 상태가 되면 `then` 메서드의 인수로 전달된 함수가 호출된다
- `then` 메서드는 항상 프로미스를 반환한다. 따라서 하나의 프로미스로부터 연속적으로 `then` 메서드를 호출할 수 있다
  - `onResolve` 또는 `onReject`함수 (`then`의 인자)에서 프로미스를 반환하면 `then` 메서드는 그 값을 그대로 반환한다
  - 프로미스가 아닌 값을 반환하면 `then`메서드는 이행됨 상태인 프로미스를 반환한다
  - `onResolve` 또는 `onReject`함수 내부에서 예외가 발생하면 `then` 메서드는 거부됨 상태인 프로미스를 반환한다
- 프로미스가 거부됨 상태인 경우에는 `onReject` 함수가 존재하는 `then`을 만날 때까지 이동한다

## catch

- catch 메서드는 then 메서드의 onReject 함수와 같은 역할을 한다
- 장점: `then`메서드의 `onResolve` 함수에서 발생한 예외는 `then`메서드의 `onReject` 함수에서 처리되지 않는다
- catch 함수도 새로운 프로미스를 반환한다

## finally

- finally는 프로미스가 이행됨 또는 거부됨 상태일 때 호출되는 메서드다
- finally 메서드는 이전에 사용된 프로미스를 그대로 반환한다
  - 따라서 처리됨 상태인 프로미스의 데이터를 건드리지 않고 추가작업할 때 유용하다

## 병렬로 처리하기: Promise.all

- 여러 개의 프로미스를 병렬로 처리할 때 사용하는 함수다
- `Promise.all` 함수는 프로미스를 반환한다
  - 입력된 모든 프로미스가 처리됨 상태가 되어야 처리됨 상태가 된다
  - 하나라도 거부됨 상태가 된다면 `Promise.all` 함수가 반환하는 프로미스도 거부됨 상태가 된다

## 가장 빨리 처리된 프로미스 가져오기: Promise.race

- `Promise.race`는 여러 개의 프로미스 중에서 가장 빨리 처리된 프로미스를 반환한다

## return 키워드 깜빡하지 않기

- `then` 메서드가 반환하는 프로미스 객체의 데이터는 내부 함수가 반환한 값이다
- return 키워드를 사용하지 않으면 프로미스 객체의 데이터는 undefined가 된다
