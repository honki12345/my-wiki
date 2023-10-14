# The Red: JAVA STREAM 강의

## 명령형 프로그래밍 vs 선언형 프로그래밍

### 예시

- 동사형태의 문제해결에 선언형프로그래밍(함수형프로그래밍)이 편리하다

## 1급 시민으로서의 조건

- 함수/메서드의 매개변수로서 전달할 수 있는가
- 함수/메서드의 반환값이 될 수 있는가
- 변수에 담을 수 있는가

### 자바에서는 함수를 오브젝트(객체) 형태로 다루면 되겠다

- 함수를 오브젝트 형태로(1급 시민으로서 사용하기 위해) 만들고 싶을 때마다 새로운 (구현한)클래스를 정의해야하나?

## 함수의 구성요소

- 함수의 이름
- 반환값의 타입(return type)
- 매개변수(parameters)
- 함수의 내용(body)

## Lambda Expression - 이름이 없는 함수(Anonymous function)

- 매개변수 타입이 유추 가능할 경우 타입생략가능
- 매개변수가 하나일 경우 괄호생략 가능
- 바로 리턴하는 경우 중괄호 생략가능

## Functional Interface

- 단 하나의 abstract method 만을 가지는 인터페이스
  - Single Abstract Method interface)

## Method reference

- 기존에 이미 선언되어 있는 메서드를 지정하고 싶을 때
- `::` 오퍼레이터를 사용
- 생략이 많기 때문에 사용할 메서드의 매개변수의 타입과 리턴 타입을 미리 숙지해야함

## 메서드 레퍼런스의 4가지 케이스: 기존에 선언되어 있는 메서드를 지정하는 방법

- 클래스의 static method 를 지정할 때

  - `ClassName::staticMethodName`

  - ```Function<String Integer> str2int = Integer::parseInt;
    int five = str2int.apply("5");
    ```

- 선언된 객체의 instance method 를 지정할 때

  - `objectName::instanceMethodName`

  - ```String str = "hello";
    Predicate<String> equalsToHello = str::equals;
    boolean helloEqualsWorld = equalsHello.test("world");
    ```

- 객체의 instance method 를 지정할 때: 해당 클래스의 인스턴스를 매개변수(parameter)로 넘겨 메서드를 실행해주는 함수

  - `ClassName::instanceMethodName`

  - ```Function<String, Integer> strLength = String::length;
    int length = strLength.apply("Hello world!");

    BiPredicate<String, String> strEquals = String::equals;
    boolean result = strEquals.test("hello", "world");
    "hello".equals("world");
    ```

- 클래스의 constructor 를 지정할 때
  - `ClassName::new`
