---
layout  : wiki
title   : 스프링 MVC 기본기능
summary : 
date    : 2023-07-27 01:00:26 +0900
updated : 2023-07-27 01:00:26 +0900
tag     : lecture mvc1
toc     : true
public  : true
parent  : [[/lecture/mvc1]]
latex   : false
resource: 1D2B1828-FC17-4D5F-A097-A6AFCEEF154A
---
* TOC
{:toc}

# 6. 스프링 MVC 기본기능

### 프로젝트 생성

- 스프링부트에 `Jar`를 사용하면 `/resources/static` 위치에 `index.html`파일을 두면 Welcome 페이지로 처리
  - 스프링부트가 지원하는 정적 컨텐츠 위치에 `/index.html`

---

### 로깅 간단히 알아보기

#### 로그 선언

- `private Logger log = LoggerFactory.getLogger(getClass());`
- `private static final Logger log = LoggerFactory.getLogger(xxx.class)`
- `@Slf4j`

#### `@RestController` vs `@Controller`

- `@Controller`: 반환 값이 `String` 이면 뷰 이름으로 인식 -> 뷰를 찾고 뷰가 렌더링
- `@RestController`: HTTP 메시지 바디에 바로 입력

#### 로그 레벨 설정

- LEVEL: `TRACE > DEBUG > INFO > WARN > ERROR`
- 개발서버: debug 출력
- 운영서버: info 출력

#### properties 파일설정

`application.properties`

```java
# 전체 로그레벨 설정(기본 info)
logging.level.root=info

# hello.spring 패키지와 그 하위 로그 레벨 설정
logging.level.hello.springmvc=debug
```

#### 올바른 로그 사용법

- `log.debug("data=" + data)`
  - 로그 출력 레벨이 맞지 않아도 "data=" + data가 실제 실행되어버린다
- `log.debug("data={}", data)`
  - 위와 같은 의미없는 연산이 발생하지 않는다

#### 로그 사용시 장점

- 부가정보(쓰레드 정보, 클래스이름 ...)도 볼 수 있고, 출력모양을 조정할 수 있다
- 로그레벨에 따라 출력 로그를 설정할 수 있다
- 콘솔 뿐만 아니라 파일, 네트워크 등 로그를 별도의 위치에 남길 수 있다
  - 파일은 일별, 특정 용량에 따라 분할 가능
  - 성능도 콘솔보다 좋다(내부 버퍼링, 멀티쓰레드 등등)

#### 요청매핑

- 스프링부트 3.0 이전
  - 매핑: `/hello-basic`
  - URL 요청: `/hello-basic`, `/hello-basic/`
- 스프링부트 3.0 이후
  - 매핑: `/hello-basic` -> URL요청: `/hello-basic`
  - 매핑: `/hello-basic/` -> URL요청: `/hello-basic/`

#### HTTP 메서드

- `@RequestMapping`에 `method` 속성으로 HTTP 메서드를 지정하지 않으면 HTTP 메서드와 무관하게 모든 메서드에서 호출된다

#### 매핑

1. URL 매핑
2. method 매핑
3. pathvariable
4. 특정 파라미터 조건
5. 특정 헤더정보 조건
6. HTTP요청: Content-Type header, consume
   consume: (서버입장) 소비, (요청의 content-type을 소비하는 개념)
7. HTTP요청: Accept header, produce
   HTTP 요청의 Accept 헤더를 기반으로 미디어타입 매핑

---

### HTTP 요청 - 기본, 헤더 조회

#### HTTP 헤더정보 조회

- `HttpServletResponse`
- `HttpMethod`: HTTP 메서드 조회
- `Locale`: Locale 정보 조회
- `@RequestHeader MultiValueMap<String, String> headerMap`
  - 모든 HTTP 헤더를 MultiValueMap 형식으로 조회
- `@RequestHeader("host") String host`
  - 특정 HTTP 헤더 조회
  - 속성
    - 필수 값 여부: `required`
    - 기본 값 속성: `defaultValue`
- `@CookieValue(value = "myCookie", required = false) String cookie`

  - 특정 쿠키를 조회한다
  - 속성
    - 필수 값 여부: `required`
    - 기본 값: `defaultValue`

- `MultiValueMap`
  - 하나의 키에 여러 값을 받을 수 있다

#### @Slf4j

- 다음 코드를 자동으로 생성해준다. 개발자는 `log`라고 이용하면 된다
  `private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(RequestHeaderController.class);`

---

### HTTP 요청 파라미터 - 쿼리 파라미터, HTML Form

#### HTTP 요청 파라미터 - @RequestParam

- HTTP 파라미터 이름이 변수이름과 같으면 name 속성 생략가능
- 파라미터 이름만 있고 값이 없는 경우 빈문자열 `""`로 통과
- 원시타입은 `@RequestParam` 생략가능
  - 원시타입은 null을 받을 수 없으므로 주의
- 파라미터에 값이 없을 경우 `defaultValue` 사용가능
- 파라미터가 값이 2개 이상일 경우 `MultiValueMap`

#### HTTP 요청 파라미터 - @ModelAttribute

- 요청 파라미터를 받아 객체를 만들고, 그 객체에 값을 넣어주는 경우

#### `@ModelAttribute`

1. 해당 객체를 생성한다
2. 요청 파라미터의 이름으로 해당 객체의 프로퍼티를 찾는다
3. 해당 프로퍼티의 setter를 호출해서 파라미터의 값을 입력
   ex. 파리미터 이름이 `username`이면 `setUsername()` 메서드를 찾아 호출

#### `@RequestParam`과 `@ModelAttribute` 생략

- `String`, `int`, `Integer` 같은 타입 -> `@RequestParam`
- 나머지 -> `@ModelAttribute`
- 주의: HTTP 메시지 바디를 통해 메시지가 직접 넘어오는 경우 `@RequestParam`, `@ModelAttribute`를 사용할 수 없다

---

### HTTP 요청메시지 - 단순 텍스트

#### 파리미터 지원

- InputStream(Reader): HTTP 요청 메시지 바디 조회
- OutputStream(Writer): HTTP 응답 메시지 바디 출력
- HttpEntity: HTTP header, body 정보를 편리하게 조회
  - 메시지 바디를 직접 조회
  - 요청 파라미터를 조회하는 기능과 상관없음 `@RequestParam` X, `@ModelAttirubte` X
  - 응답에도 사용가능
    - 바디정보 직접반환
    - 헤더정보 포함가능
    - view 조회불가
- RequestEntity: `HttpEntity` 상속
  - HttpMethod, url정보 추가
- ResponseEntity: `HttpEntity` 상속
  - HTTP 상태코드 설정가능
  - ex. `return new ResponseEntity<String>("Hello World", responseHeaders, HttpStatus.CREATED)`

#### 메시지 컨버터(HttpMessageConverter)

- HTTP 메시지 바디를 읽어서 문자나 객체로 변환해주는 역할

#### 요청 파라미터 vs HTTP 메시지 바디

- 요청 파라미터 조회: `@RequestParam`, `@ModelAttribute`
- HTTP 메시지 바디조회: `@RequestBody`
- HTTP 메시지 바디출력: `@ResponseBody`

---

### HTTP 요청메시지 - JSON

#### objectMapper

- 문자로 된 JSON 데이터를 Jackson 라이브러리인 `objectMapper`를 사용해서 자바 객체로 변환

#### @RequestBody

- `HttpEntity`, `@RequestBody`를 사용하면 HTTP 메시지 컨버터가 HTTP 메시지 바디의 내용을 문자나 객체(JSON ...) 등으로 변환해준다
- 생략불가능: 생략 시 `@ModelAttribute`로 처리

##### 주의

- HTTP 요청시에 content-type이 applicaton/json인지 꼭 확인해야 한다. 그래야 JSON을 처리할 수 있는 HTTP 메시지 컨버터가 실행된다

##### 정리

- `@RequestBody` 요청
  - JSON 요청 -> HTTP 메시지 컨버터 -> 객체
- `@ResponseBody` 응답
  - 객체 -> HTTP 메시지 컨버터 -> JSON 응답

---

### HTTP 응답 - 정적리소스, 뷰 템플릿

#### 정적 리소스

- `src/main/resources`는 리소스를 보관하는 곳이고, 클래스패스의 시작 경로이다
- 정적리로스 경로: `src/main/resources/static`
- 뷰 템플릿 경로: `src/main/resources/templates`

---

### HTTP 메시지 컨버터

#### 적용

- HTTP 요청: `@RequestBody`, `HttpEntity(RequestEntity)`
- HTTP 응답: `@ResponseBody`, `HttpEntity(ResponseEntity)`
- 대상 클래스 타입과 미디어 타입 둘을 체크해서 사용여부를 결정

#### HTTP 요청 데이터 읽기

- HTTP 요청이 오고, 컨트롤러에서 `@RequestBody`, `HttpEntity`파라미터를 사용
- 메시지 컨버터가 메시지를 읽을 수 있는지 확인하기 위해 `canRead()` 호출
  - 대상 클래스타입을 지원하는가?
  - HTTP 요청의 Content-Type 미디어 타입을 지원하는가?
- `canRead()` 조건을 만족하면 `read()`를 호출해서 객체 생성 및 반환

#### HTTP 응답 데이터 생성

- 컨트롤러에서 `@ResponseBody`, `HttpEntity`로 값이 반환
- 메시지 컨버터가 메시지 쓸 수 있는지 확인하기 위해 `canWrite()` 호출
  - 대상 클래스타입을 지원하는가?
  - HTTP 요청의 Accept 미디어 타입을 지원하는가 (`@RequestMapping`의 `produces`)
- `canWrite()` 조건을 만족하면 `write()`를 호출해 HTTP 응답 메시지 바디에 데이터를 생성

---

### 요청 매핑 핸들러 어댑터 구조

#### HTTP 메시지 컨버터 동작

- HTTP 메시지 컨버터의 동작원리는 `@RequestMapping`을 처리하는 핸들러 어댑터인 `RequestMappingHandlerAdapter`에 있다

![RequestMappingHandlerAdapter 동작방식](https://github.com/honki12345/honki12345.github.io/assets/70520674/e26c0e3c-4abf-4235-ba5f-d66610247b22)

- 어노테이션 기반 컨트롤러를 처리하는 `RequestMappingHandlerAdapter`는 바로 이 `ArgumentResolver`를 호출해서 컨트롤러가 필요로 하는 다양한 파라미터의 값(객체)를 생성한다

#### ArgumentResolver

- `supportsParameter()`를 호출해서 해당 파라미터를 지원하지는 체크하고
- `resolveArgument()`를 호출해서 실제 객체를 생성
- 생성된 객체가 컨트롤러 호출시 넘어간다

#### ReturnValueHandler

- 응답 값을 변환하고 처리

#### 동작구조

- 요청: `@RequestBody`를 처리하는 `ArgumentResolver`가 있고, `HttpEntity`를 처리하는 `ArgumentResolver`가 있다. 이러한 `ArgumentResolver`들이 HTTP 메시지 컨버터를 사용해서 필요한 객체를 생성
- 응답: `@ResponseBody`, `HttpEntity`를 처리하는 `ReturnValueHandler`가 있다. 이러한 `ReturnValueHandler`가 HTTP 메시지 컨버터 이용

#### 확장

- 기능 확장 시 `WebMvcConfigurer`를 상속받아 스프링 빈으로 등록
  - ex. `addArgumentResolvers()`나 `extendMessageConverters()`

