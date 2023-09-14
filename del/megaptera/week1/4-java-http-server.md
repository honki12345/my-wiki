---
layout  : wiki
title   : java http server
summary : 
date    : 2023-07-27 00:13:03 +0900
updated : 2023-07-27 00:13:03 +0900
tag     : megaptera week1
toc     : true
public  : true
parent  : [[/megaptera/week1]]
latex   : false
resource: DF9F1A2E-472C-4DEF-B148-518B1B31E13F
---
* TOC
{:toc}

# 4. Java HTTP Server

### Java HTTP Server

#### HttpServer

- IP주소와 포트번호를 바인딩하여 TCP 연결 수신대기한다
- 클라이언트 요청을 처리하려면 하나 이상의 HttpHandler 객체가 연결되어야한다
- 핸들러객체(HttpHandler)는 매핑은 HttpContext에 의해 캡슐화된다
- HttpContext들은 createContext(String, HttpHandler)를 통해 만들어진다
- 매핑된 핸들러가 없는 요청에 대해서는 404 응답을 한다

#### backlog

- 대기열에 넣을 TCP커넥션 최대 수를 정한다
- 커넥션은 HttpServer의 수락까지 큐에 대기한다
- 최대치를 넘어서는 요청에 대해서는 거부하거나 무시한다

---

### Java NIO

#### IO vs NIO

- IO

  - 연결 클라이언트 수가 적고
  - 전송되는 데이터가 **대용량**이며
  - **순차적**으로 처리되어야할 때
- NIO
  
  - 연결 클라이언트 수가 많고
  - 전성되는 데이터용량이 **적고**
  - 입출력 **작업처리가 빨리 끝나는** 경우 (멀티쓰레드환경)

|구분|IO|NIO|
|---|---|---|
|입출력방식|스트림 방식|채널 방식|
|버퍼방식|non-buffer|buffer|
|동기/비동기 방식|동기|동기/비동식 모두지원|
|blocking/non-blocking|blocking|blocking/non-blocking 모두지원|

#### 스트림 vs 채널

- IO -> 스트림: (단뱡항) 입력스트림과 출력스트림으로 구분
- NIO -> 채널: 양방향으로 입력과 출력가능

#### non-buffer vs buffer

- IO -> non-buffer: IO에서는 1바이트씩 읽고 출력한다
- NIO -> buffer: 읽은 데이터는 buffer(메모리 저장소)에 저장하므로
버퍼 내에서 필요한 부분만 가져올 수 있다

#### blocking vs non-blocking

- IO -> blocking: 입력스트림의 read()를 호출하면 데이터가 입력되기 전까지
스레드는 블로킹(대기상태)가 된다  
  쓰레드가 블로킹되면 다른 일을 할 수 없고 interrup해서 블로킹을 빠져나올 수 없다
- NIO -> blocking, non-blocking: NIO의 blocking은 interrupt로 빠져나올 수 있다

---

### Java Lambda expression

#### 람다

- 함수형 언어에서 함수는 일등시민으로 생성, 저장, 참조, 사용, 전달이 가능하다
- 이러한 기능을 모방하기위해 java 8에서 도입된 함수형프로그래밍은 내부적으로는 객체이지만 객체성을 숨기고 함수를 정의할 수 있다
- 람다는 메서드처럼 매개변수가 있고 값을 반환한다. 하지만 메서드와 달리 다른 메서드에 인자로 사용할 수 있고 변수에 저장할 수 있다

#### 함수형 인터페이스

- 하나의 메서드가 선언된 인터페이스를 함수형 인터페이스로 정의하고 람다식을 다루는데 사용

#### java.util.function 패키지

|함수형 인터페이스|메서드|설명|
|---|---|---|
|java.lang.Runnable|void run()|매개변수X 반환값X|
|Supplier&lt;T&gt;|T get()|매개변수X 반환값O|
|Consumer&lt;T&gt;|void accept(T t)|매개변수O 반환값X|
|Function&lt;T, R&gt;|R apply(T t)|매개변수O 반환값O|
|Predicate&lt;T&gt;|boolean test(T t)|매개변수O 반환값O|

- BiConsumer, BiPredicate, BiFunction: 매개변수가 두 개인 함수형 인터페이스
- UnaryOperator와 BinaryOperator: 매개변수 타입과 반환타입의 타입이 일치
- 기본형(primitive type)을 사용하는 함수형 인터페이스  

