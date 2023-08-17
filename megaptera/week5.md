# 5주차 DI & Sprign Test

#### 학습 목표

- 의존성 주입이란 무엇인지 이해한다
- 왜 테스트 코드를 작성하는지를 알고 테스트 코드를 작성할 수 있다

## 1. Dependency Injection

### Spring AOP(Aspect Oriented Programming)

- AOP 는 프로그램의 구조를 관점(aspect) 기준으로 공통된 모듈로 분리하는 방법이다
- 객체 지향 프로그래밍에서는 모듈 단위는 클래스인 반면, 관점 지향 프로그래밍에서는 모듈 단위가 관점이다
    - 두 프로그래밍은 상호보완적으로 동작한다
- 관점지향프로그래밍은 프레임워크의 도움을 받아 코드를 조립한다 
    - 클래스의 코드와 관점의 코드를 완전히 분리할 수 있다 (관심의 분리 separation of concerns)
    - 개발자가 명시적으로 관점 객체를 생성하지 않으며, 메서드도 직접 호출하지 않는다

#### 관점(Aspect)

- 관점은 여러 클래스에 걸쳐 공통으로 실행되는 기능을 모듈로 분리한 것이다

#### 관점지향프로그래밍 설계

- 기능의 분류
    - 기능적 요구사항: 애플리케이션에 필요한 비즈니스 핵심로직
        e.g. 호텔 조회, 예약, 결제...
    - 비기능적 요구사항
        e.g. 로깅, 트랜잭션...
- 공통 기능의 분류
- 공통 기능의 적용

![image-20230817161014273](C:\Users\iui47\dev\my-wiki\megaptera\week5.assets\image-20230817161014273.png)

#### 횡단 관심사

- 공통 로직이 핵심 비즈니스 로직들을 **횡단**하는 형태를 갖는다

#### 스프링 AOP 예제

- 트랜잭션 관리, 캐시 추상화 등

#### AOP 용어 정리

- 대상객체(target object): 공통 모듈을 적용할 대상
- 관점(aspect): 공통 모듈과 적용될 위치 정보의 조합
    관점은 어드바이스(공통모듈)와 포인트 컷(위치정보)을 합친 것
- 어드바이스(advice): 공통 로직이 작성된 모듈 
    스프링 AOP 에서 어드바이스는 메서드 형태
- 포인트 컷(point cut): 어드바이스를 적용할 위치를 선정하는 설정
- 조인포인트(join points): 어드바이스가 적용된 위치
- 포인트 컷은 대상을 선정하는 설정, 선정된 그 위치가 조인포인트
- 위빙(weaving): 조인포인트에 어드바이스를 끼워 넣는 과정
- 프록시 객체(proxy object): 관점 클래스와 대상 클래스의 기능을 조합하기 위해 동적으로 만든 객체  

#### 어드바이스 로직을 적용할 수 있는 위치

- 클라이언트 클래스가 서버 클래스의 메서드를 실행하기 전
- 실행된 서버 클래스의 메서드가 성공적으로 기능을 실행하고 메서드를 리턴한 후
- 실행된 서버 클래스의 메서드 내부에 예외가 발생하여 메서드가 예외를 던진 후

#### 어드바이스 종류

- `@Before`, `@After`, `@AfterReturning`, `@AfterThrowing`, `@Around`

#### 스프링 AOP 와 프록시 객체

- 스프링 AOP 모듈은 `ApplicationContext` 객체의 메서드가 호출되면 IoC 컨테이너가 이를 감지하여 대상 객체를 감싸는 프록시 객체를 생성한다
- AOP 대상 객체와 어드바이스는 모두 IoC 컨테이너로 관리되어야 한다. (스프링 빈으로 정의되어야한다)

#### 위빙방식

- 대상객체가 인터페이스를 구현하면 JDK Proxy 방식, 대상 객체가 인터페이스를 상속하지 않으면 CGLib 방식

#### 정리

- 관점 클래스는 어드바이스와 포인트 컷을 포함하고 있다
    - 관점 클래스를 정의하기 위해서는 `@Aspect` 애너테이션을 사용한다
    - 스프링 빈으로 정의한다





### 싱클톤 패턴

### IoC(Inversion of Control)

### Spring Bean

### BeanFactory





## 2. Unit Test

#### 테스트 케이스

- 기능을 테스트 하기 위해 입력값, 실행조건, 기댓값으로 구성된 항목

#### 테스트 자동화

- 패키징을 하기 전에 작성한 테스트 케이스들을 자동으로 실행하고, 실행 결과에 따라 패키지 생성 여부를 설정 및 결정

#### 단위테스트(unit test)

- 메서드 단위로 테스트하는 것

#### 통합테스트(integration test)

- 여러 클래스로 구성된 기능을 테스트하거나 데이터베이스 및 다른 컴포넌트와 함께 테스트 하는 것

#### 회귀 테스트(regression test)

- 시스템을 운영, 유지 보수하면서 발생한 버그들을 테스트 케이스로 만들어서 이전에 발생한 버그들이 다시 발생하지 않도록 테스트

#### 좋은 단위 테스트를 위한 F.I.R.S.T 원칙

- Fast: 테스트 케이스는 빠르게(fast) 동작해야 한다.
    테스트 과정은 개발 시간에 영향을 미친다
- Isolated: 테스트 케이스는 다른 외부 요인에 영향을 받지 않도록 격리(isolated) 해야한다
    테스트 케이스 사이에 서로 영향을 주지 않는 테스트 케이스를 작성해야한다.
    테스틐클래스의 전역변수, 상태 값에 주의해야한다
- Repeatable: 테스트케이스는 반복해서 실행해서, 실행마다 같은 테스트 결과를 확인할 수 있어야한다
- Self-validating: 테스트 케이스 내부에는 결과 값을 자체검증(self-validating) 할 수 있어야한다
- Timely: 실제 코드를 개발하기 전 테스트케이스를 먼저 작성하는 것
    기능 요구 사항에 따라 테스트 케이스들을 먼저 정의하고 기능을 하나씩 개발한다

#### 테스트케이스 라이프사이클 설정애너테이션

- `@BeforeAll` : 테스트 클래스 인스턴스를 초기화할 때 가장 먼저 실행된다
    객체를 생성하기 전에 미리 실행하므로 메서드는 static 접근 제어자가 정의해야한다
- `@BeforeEach`: 모든 테스트 메서드가 실행되기 전 각각 한번씩 실행된다
- `@AfterAll`: 테스트 클래스의 모든 테스트 메서드가 실행을 마치면 마지막으로 한 번만 실행된다
- `@AfterEach`: 모든 테스트 메서드가 실행된 후 각각 한번 씩 실행된다

### Dependency Injection

### V 모델

### Test Matrix

### 내적품질(테스트 코드 작성 등)을 높이면 좋은 이유

### JUnit

### E2E 테스트



## 3. Spring Test

### `@SpringBootTest`

#### `WebEnvironmnet` 속성

- WebEnvironment.MOCK: 서블릿 컨테이너를 실행하지 않고 서블릿을 목으로 만들어 테스트를 실행한다.
    스프링 테스트 모듈에서 제공하는 MockMvc 객체를 사용하여 스프링 MVC 기능을 테스트할 수 있다
- WebEnvironment.RANDOM_PORT: 테스트를 진행할 때 서블릿 컨테이너를 실행한다
    서블릿 컨테이너의 포트를 랜덤값으로 설정한다
- WebEnvironment.DEFINED_PORT: 테스트를 진행할 때 서블릿 컨테이너를 실행한다
    `application.properties`에 정의된 포트를 사용하여 서블릿 컨테이너를 실행한다
- WebEnvironment.NONE: 서블릿 환경을 구성하지 않고 테스트를 실행한다



#### properties 속성

- `@SpringBootTest(properties={"search.host=127.0.0.1", "search.port=19999"})`
    `application.properties` 에 같은 키 이름의 값이 있다면 그 값을 `@SpringBootTest` 애너테이션에 설정된 값으로 대체한다
- `@SpringBootTest(properties={"spring.config.location=classpath:application-test.properties"})`
    테스트 케이스에서만 사용할 properties 를 생성하고 설정한 후 사용한다



### `@TestConfiguration` 을 이용한 테스트 환경 설정

- 이 기능을 통해 기존에 이미 정의한 스프링 빈을 테스트에 적합하게 커스터마이징할 수 있다
    e.g. 직접 데이터베이스 연결하지 않고, 애플리케이션 내부의 메모리 데이터베이스 접근
    다른 서버의 REST-API 호출하지 않고 내부의 목(mock) 서버 연결
- `@TestConfiguration` 애너테이션이 사용된 클래스에는 `@Bean` 으로 정의한 스프링 빈을 하나 이상 포함할 수 있다.
    정의된 스프링 빈은 테스트 환경에서만 유효하다



### `@MockBean` 을 사용한 테스트 환경설정

- `Spring-boot-starter-test` 는 spring-boot-test 모듈을 포함하고 있다.
    spring-boot-test 모듈은 Mockito 라이브러리와 `@MockBean` 애너테이션을 제공한다
- `Mockito` 는 목(mock) 객체를 만들고, 목 객체의 행동과 결과를 검증할 수 있는 기능을 제공한다 (테스트 환경 설정부터 테스트 검증까지)
- `@MockBean`은 목 객체를 생성하고 주입하는 방법과 목 객체의 행동을 설정하는 방법을 설정한다
- `@Mock` vs `@MockBean`: `@Mock`은 `Junit`과 `Mockito`를 사용하여 일반 자바 객체를 테스트하는데 사용하는 반면 `@MockBean`은 스프링의 `ApplicationContext`를 사용하여 스프링 빈을 목 객체로 만들어 주입할 수 있다

#### 동작

- `@MockBean` 을 정의하고 실행하면 별도의 설정 없이 목 객체가 생성된다
    생성된 목 객체는 `ApplicationContext`에 추가된다. ( 목객체와 같은 클래스타입, 같은 이름의 스프링 빈은 목 객체로 바뀐다)
    `ApplicationContext`는 목객체를 주입받기 원하는 스프링 빈에 목객체를 주입한다



### 테스트 슬라이스 애너테이션

- `@SpringBootTest`으로 테스트를 실행하면 `ApplicationContext`를 이용하여 스프링 빈을 스캔하고 의존성 주입을 한다. 그러므로 테스트 시간이 늘어날 수 있다
- 테스트 슬라이스(test slice): 기능별로 잘라서 테스트 대상을 좁히는 방법이다
    테스트 대상이 좁혀지면 `ApplicationContext`가 스캔해야 하는 스프링 빈의 개수도 줄어들고, 기능도 초기화하지 않아도 된다
- `@WebMvcTest`: 스프링 MVc 프레임워크의 기능을 테스트한다
    `@Controller`, `@ControllerAdvice` 를 스캔하고 Converter, Filter, WebMvcConfigurer 같은 MVC 기능도 제공한다
    `@Service`, `@Component`, `@Repository` 로 정의된 스프링 빈들은 스캔하지 않는다
- `@DataJpaTest`: JPA 기능을 테스트할 수 있다. `@Repository` 대상으로 스캔한다
    EntityManager, TestEntityManager, DataSource 같은 기능을 제공한다
    `@Service`, `@Component`, `@Controller` 로 정의된 스프링 빈들은 스캔하지 않는다
- `@JsonTest`: Json 직렬화, 역직렬화를 테스트할 수 있다.
    @JsonComponent, ObjectMapper 같은 기능을 테스트할 수 있다
    `@Service`, `@Component`, `@Controller`, `Repository` 로 정의된 스프링 빈들은 스캔하지 않는다
- `@RestClientTest`: HTTP 클라이언트의 동작을 테스트할 수 있는 기능
    MockRestServiceServer와 Jackson 자동설정기능을 제공한다
    `@Service`, `@Component`, `@Controller`, `@Repository` 로 정의된 스프링 빈들은 스캔하지 않는다
- `@DataMongoTest`: MongoDB를 테스트하기 위한 기능



### `@WebMvcTest`

- HTTP 프로토콜을 사용하여 요청과 응답을 테스트하는 방식이 아니다
    서버와 클라이언트 사이의 네트워크 구간은 문제없다고 생각하여 서버의 요청과 응답기능의 동작을 테스트한다
- `MockMvc`: 실제로 HTTP 프로토콜을 사용하여 서버의 API 를 호출하지 않고, 요청을 전송하고 응답을 받아 올 수 있는 기능을 제공하는 객체
    - 함께 쓰이는 클래스`MockMvcRequestBuilders`, `MockMvcResultMatchers`, `ResultActions`
    - `MockMvcRequestBuilders`: HTTP 요청을 목 객체로 만들 수 있는 기능
        요청 메세지의 HTTP 헤더나 파라미터, HTTP 바디를 설정할 수 있다
    - `MockMvcResultMatchers`: HTTP 응답 메세지를 검증할 수 있는 기능
    - `ResultActions`: 응답 메시지의 각 속성에 접근할 수 있는 메서드제공

![image-20230817230320841](C:\Users\iui47\dev\my-wiki\megaptera\week5.assets\image-20230817230320841.png)

- `@AutoConfigureMockMvc`: `MockMvc` 객체는 `MockMvcBuilders` 클래스를 이용하여 생성할 수 있지만 위의 어노테이션을 정의하면 MockMvc 객체를 스프링 빈으로 주입받을 수 있다
    `@SpringBootTest` 애너테이션을 사용하여 스프링 MVC 기능을 테스트할 때 같이 사용한다
    `@WebMvcTest` 어노테이션은 `@AutoConfigureMockMvc` 애너테이션 없이도 MockMvc 객체를 생성한다
- `jsonPath()` 메서드를 사용하면 JSON 응답 메시지의 속성 값을 검증할 수 있다
    - `$`: 조회할 최상위 JSON 엘리먼트이다
    - `[(index)]`: JSON 배열의 인덱스 값과 같이 사용하여 해당 위치의 JSON 엘리먼트를 참조할 수 있다
    - `.<name>`: 엘리먼트의 자식을 참조한다
    - e.g. `$[0].hotelName`: JSON 배열 형태의 응답메세지에서 첫번째 JSON 엘리먼트의 hotelName 값을 참조한다



### `@DataJpaTest`

- 데이터를 처리하는 영역을 구분하여 빠르게 테스트하는 방법이다
    - `@Repository` 애너테이션은 데이터베이스에 데이터를 생성 삭제 수정 조회하는 기능을 제공하는 클래스를 스프링 빈으로 정의할 때 사용한다

- `@DataJpaTest` 는 `@Repository` 만 스캔한다
- `@Transactional`: 테이스케이스에 `@Transactional` 애너테이션이 정의되면 테스트 종료 후 롤백된다
    - `@DataJpaTest` 내부에 `@Transactional` 애너테이션을 포함하고 있다.
- 만약 `@SpringBootTest`의 `environment` 속성이 `RANDOM_PORT`나 `DEFINED_PORT`로 설정하면 **롤백되지 않는다**.
     이 설정시에는 별도의 서블릿 컨테이너가 실행된다. 테스트 케이스를 실행하는 스레드와 테스트 케이스가 호출한 서블릿 컨테이너의 스레드가 서로 달라 서블릿 컨테이너의 트랜잭션을 테스트 케이스에서 롤백할 수 없기 때문이다.



### `@Autowired`

### @SpyBean

### MockMvc

### `@WebMvcTest`



## 4. TDD