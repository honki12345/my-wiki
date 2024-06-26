# 타입스크립트 교과서

## 1. 타입스크립트 시작하기

- 타입스크립트가 무엇이고, 왜 사용해야하는가
- 타입스크립트를 학습할 때 도움이 되는 자료
- 공식사이트에서의 타입스크립트 설명
  - TypeScript is JavaScript with syntax for types
- 타입스크립트를 배운다는 것은 자바스크립트에 타입을 표시하는 방법

## 기본문법익히기

- `implicitAny`에러: 암묵적 any 때문에 발생하는 에러
- 추론 원칙
  - 타입스크립트가 타입을 제대로 추론하면 그대로 쓰고, 틀리게 추론할 때만 올바른 타입을 표기한다
- `{}` 타입
  - `null`과 `undefined`를 제외한 모든 타입을 의미
- `null`과 `undefined`를 `let` 변수에 대입할 때는 `any`로 추론한다
- `const`일 때 => `typeof sym`은 (다른 `symbol`로 변경할 수 없는)고유한 `symbol`
  - 타입스크립트에서는 `unique symbol` 끼리는 서로 비교할 수 없습니다

## 배열 말고 튜플도 있다

- 빈 배열은 `any[]`로 추론된다
- 튜플: 각 요소 자리에 타입이 고정되어 있는 배열
  - `[]` 안에 정확한 타입을 하나씩 입력하면 됩니다. 표기하지 않은 자리는 `undefined` 타입이 됩니다
  - 메서드를 막진 않습니다. `readonly`를 통해 막을 수 있습니다

## 타입으로 쓸 수 있는 것을 구분하자

- 변수에 `typeof`를 앞에 붙여 타입으로 사용 가능
- 클래스의 이름은 `typeof` 없이도 타입으로 사용할 수 있습니다

## 유니언 타입으로 OR 관계를 표현하자

- 유니언 타입은 하나의 변수가 여러 타입을 가질 수 있는 가능성을 표시하는 것
- 타입좁히기(type narrowing): 유니언 타입으로부터 정확한 타입을 찾아내는 기법

## 타입스크립트에만 있는 타입을 배우자

- any
  - any 타입을 통해 파생되는 결과물도 any 타입이 됩니다
- unknown
  - unknown 은 any 와 비슷하게 모든 타입을 대입할 수 있지만 그 후 어떠한 동작도 수행할 수 없게됩니다
  - `catch` 문의 `e`에는 `any`와 `unknown` 외의 타입을 직접 표기할 수 없습니다. 이럴 때는 `as`로 타입을 주장(Type Assertion)할 수 있습니다
  - 또는 `null` 또는 `undefined`가 아님을 주장하는 연산자 `!`(non-null assertion)가 있습니다
- void
  - 사용자가 함수의 반환값을 사용하지 못하도록 제한한다
  - 반환값을 사용하지 않는 콜백 함수를 타이핑할 때 사용한다

## 타입 별칭으로 타입에 이름을 붙이자

- 타입 별칭은 `type` 키워드를 사용해서 선언할 수 있습니다
- 타입 별칭은 대문자로 시작하는 단어로 만드는 것이 컨벤션입니다

## 인터페이스로 객체를 타이핑하자

- 인터페이스의 이름은 대문자로 시작하는 단어로 만드는 것이 타입스크립트의 컨벤션입니다
- 인덱스 시그니처: 인터페이스의 속성 키 자리에 `[key: number]` 라는 문법이 있습니다
  - 이는 이 객체의 `length`를 제외한 속성 키가 전부 `number`라는 의미입니다
- 타입스크립트에서 속성 키로 가능한 타입은 `string`, `symbol`, `number`가 있습니다

## 인터페이스 선언 병합

- 인터페이스끼리는 서로 합쳐진다
- 선언병합(declaration merging)은 같은 이름으로 여러 인터페이스를 선언하면 모든 인터페이스가 하나로 합쳐지는 현상

## 네임스페이스

- 다른 사람이 만든(라이브러리) 인터페이스와 내 인터페이스의 이름이 우연히 겹쳐 원하지 않게 인터페이스가 병합 될 수 있습니다
  - 이럴 때를 대비하고자 네임스페이스가 있습니다
- 하지만 네임스페이스도 병합되는 특성이 있기에 모듈 파일을 활용해야 합니다

## 객체의 속성과 메서드에 적용되는 특징을 알자

- 객체의 속성에도 옵셔널이나 `readonly` 수식어가 가능합니다
- 객체 리터럴을 대입했냐, 변수를 대입했냐에 따라 타입 검사 방식이 달라집니다
  - 객체 리터럴을 대입하면 잉여 속성 검사(Excess Property Checking)이 실행됩니다.
    - 잉여 속성 검사는 타입 선언에서 선언하지 않은 속성을 사용할 때 에러를 표시하는 것을 의미합니다
  - 변수를 대입할 때는 객체 간 대입 가능성을 비교하게 됩니다

## 인덱스 접근 타입

- 인덱스 접근타입(indexed access type)이란 객체 속성의 타입에 접근하는 방식
- `keyof` 연산자와 인덱스 접근 타입을 활용해 키의 타입과 값을 타입을 구할 수 있습니다
  - 키의 타입은 'keyof 객체*타입'이고, 값의 타입은 '객체*타입[키의 타입]' 입니다
