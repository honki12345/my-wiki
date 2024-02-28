# 자바

- <https://dev-coco.tistory.com/153>

## Java의 특징을 설명해주세요

- Java는 객체지향 프로그래밍 언어입니다
- 기본자료형을 제외한 모든 요소들이 객체로 표현되고, 객체 지향 개념의 특징인 캡슐화, 상속, 다형성이 잘 적용된 언어입니다
- 장점
  - JVM(자바가상머신) 위에서 동작하기 때문에 운영체제에 독립적이다
  - Gabagecollector를 통한 자동적인 메모리 관리가 가능하다
- 단점
  - JVM 위에서 동작하기 때문에 실행속도가 상대적으로 느리다
  - 다중 상속이나 타입에 엄격하며, 제약이 많다

## JVM 의 역할에 대해 설명해주세요

- JVM은 스택 기반으로 동작하며, Java Byte Code를 OS에 맞게 해석해주는 역할을 하고 가비지컬렉션을 통해 자동적인 메모리 관리를 해줍니다

## Java의 컴파일 과정에 대해 설명해주세요

- 1. 개발자가 Java 파일을 생성한다
- 2. build를 한다
- 3. Java compiler의 javac 명령어를 통해 바이트코드(.class)를 생성한다
- 4. Class Loader를 통해 JVM 메모리 내로 로드한다
- 5. 실행엔진을 통해 컴퓨터가 읽을 수 있는 기계어로 해석된다

## Java에서 제공하는 원시 타입들에 무엇이 있고, 각각 몇 바이트를 차지하나요?

- 정수형 byte(1), short(2), int(4), long(8) 실수형 float(4), double(8) 문자형 char(2), 논리형 boolean(1)

## 오버라이딩(overriding)과 오버로딩(overloading)에 대해 설명해주세요

- 오버라이딩(Overriding)은 상위 클래스에 있는 메소드를 하위 클래스에서 재정의 하는 것
- 오버로딩(Overloading)은 매개변수의 개수나 타입을 다르게하여 같은 이름의 메소드를 여러 개 정의하는 것을 말합니다

## 객체지향 프로그래밍(OOP)에 대해 설명해주세요

- 객체지향이란 시스템을 상호작용하는 자율적인 객체들의 공동체로 바라보고 객체를 이용해 시스템을 분할하는 방법

## try-with-resources에 대해 설명해주세요

- try-with-resources는 try-catch-finally의 문제점을 보완하기 위해 나온 개념
- try(...) 안에 자원 객체를 전달하면, try 블록이 끝나고 자동으로 자원해제 해주는 기능을 말합니다
- 따로 finally 구문이나 모든 catch 구문에 종료 처리를 하지 않아도 되는 장점이 있습니다

## 불변 객체가 무엇인지 설명하고 대표적인 Java의 예시를 설명해주세요

- 불변 객체는 객체 생성 이후 내부의 상태가 변하지 않는 객체를 말합니다
- Java에서는 필드가 원시타입인 경우 final 키워드를 사용해 불변 객체르 만들 수 있고, 참조타입일 경우엔 추가적인 작업이 필요합니다
- 참조타입일 경우 추가적인 작업은 어떤게 있는지 설명해주세요
  - 참조 타입은 대표적으로 1. 객체를 참조할 수도 있고, 2. 배열이나 3. List 등을 참조할 수 있습니다
  - 1. 참조 변수가 일반 객체인 경우 객체를 사용하는 필드의 참조변수도 불변객체로 변경해야합니다
  - 2. 배열일 경우 배열을 받아 copy해서 저장하고, getter를 clone으로 반환하도록 하면 됩니다
  - 3. 리스트인 경우에도 배열과 마찬가지로 생성시 새로운 List를 만들어 값을 복사하도록 해야 합니다. 배열과 리스트는 내부를 복사하여 전달하는데, 이를 방어적 복사라고 합니다
- 불변 객체나 final을 굳이 사용해야하는 이유가 있을까요?
  - 1. Thread-safe 하여 병렬 프로그래밍에 유용하며, 동기화를 고려하지 않아도 된다
  - 2. 실패 원자적인 메소드를 만들 수 있다
  - 3. 부수효과를 피해 오류를 최소화할 수 있다
  - 4. 메소드 호출 시 파라미터 값이 변하지 않는다는 것을 보장할 수 있다
  - 5. 가비지 컬렉션 성능을 높일 수 있다

## 추상클래스와 인터페이스를 설명해주시고, 차이에 대해 설명해주세요

- 추상클래스는 클래스 내 추상메소드가 하나 이상 포함되거나 abstract로 정의된 경우를 말한다
- 인터페이스는 모든 메소드가 추상메소드로만 이루어져 있는 것을 말합니다
- 공통점
  - new 연산자로 인스턴스 생성 불가능
  - 사용하기 위해서는 하위클래스에서 확장/구현 해야한다
- 차이점
  - 인터페이스는 그 인터페이스를 구현하는 모든 클래스에 대해 특정한 메소드가 반드시 존재하도록 강제함에 있고,
  - 추상클래스는 상속받는 클래스들의 공통적인 로직을 추상화시키고, 기능 확장을 위해 사용한다
  - 추상클래스는 다중상속이 불가능하지만, 인터페이스는 다중 상속이 가능하다

## 싱글톤 패턴에 대해 설명해주세요

- 싱글톤 패턴은 단 하나의 인스턴스를 생성해 사용하는 디자인 패턴입니다
- 인스턴스가 1개만 존재해야 한다는 것을 보장하고 싶은 경우와 동일한 인스턴스를 자주 생성해야 하는 경우에 주로 사용합니다 (메모리 낭비 방지)

## 싱글톤 패턴의 대표적인 예시를 간단하게 설명해주세요

- 싱글톤 패턴의 대표적인 예시는 Spring Bean 입니다. 스프링의 빈 등록

---

## Compilation and Execution of a Java Program

- <https://www.geeksforgeeks.org/compilation-execution-java-program/>
- first through an OS-independent compiler
  seconde, in a virtual machine
- `main` class file is passed to the JVM and the goes through three main stages before the final machine code is executed
  - 1. ClassLoader
  - 2. Bytecode Verifier
  - 3. Just-In-Time Compiler

## ClassLoader in Java

- <https://www.geeksforgeeks.org/classloader-in-java/>
- The **Java ClassLoader** is a part of the Java Runtime Environment that dynamically loads Java classes into the Java Virtual Machine
- Java classes aren't loaded into memory all at once, but when required by an application
  At this point, the **Java ClassLoader** is called by the **JRE** and these ClassLoaders load classes into memory dynamically
- Not all classes are loaded by a single ClassLoader
  Depending on the type of class and the path of class, the ClassLoader that loads that particular class is decided
- types
  - 1. BootStrap ClassLoader: A Bootstrap Classloader is a Machine code which kickstarts the operation when the JVM calls it. it is not a java class. its job is to load the first pure Java ClassLoader. Bootstrap ClassLoader loads classes from the location _rt.jar_. Bootstrap ClassLoader doesn't have any parent ClassLoaders. It is called as the **Primordial ClassLoader**
  - 2. Extension ClassLoader: The Extension ClassLoader is a child of Bootstrap ClassLoader and loads the Extensions of core java classes from the respective JDK Extension library. It loads files from _jre/lib/ext_ directory or any other directory pointed by the system property _java.ext.dirs_
