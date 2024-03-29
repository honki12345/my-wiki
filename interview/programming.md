# 신입 개발자 기술면접 질문 정리 - 프로그래밍 공통/기타

- 출처: <https://dev-coco.tistory.com/164> [슬기로운 개발생활:티스토리]

## Restful API에 대해 설명해주세요

- Restful API는 HTTP 통신을 Rest 설계 규칙을 잘 지켜서 개발한 API를 Restful한 API라고 합니다
- Rest 설계 규칙은 URI는 정보의 자원만 표현해야 하며, 자원의 상태와 행위는 HTTP Method에 명시하는걸 말합니다

## Call By Value와 Call By Reference의 차이에 대해 설명해주세요

- Call By Value: 인자로 받은 값을 복사하여 처리하는 방식
  - 장점: 값을 복사하여 처리하기 때문에 원래의 값이 보존된다
  - 단점: 복사하기 때문에 메모리 사용량이 증가한다
- Call By Reference: 인자로 받은 값의 주소를 참조하여 직접 저장해 값에 영향을 주는 방식입니다
  - 장점: 복사하지 않고 직접 참조하기에 빠르다
  - 단점: 직접 참조를 하기에 원래의 값이 영향을 받는다
- Java는 기본적으로 모든 전달방식이 Call by Value입니다

## CORS(Cross-Origin Resource Sharing)에 대해 설명해주세요

- CORS란 도메인이 서로다른 2개의 사이트가 데이터를 주고 받을 때 발생하는 문제입니다
  예를들어 `domain-a.com <-> domain-b.com` 으로 데이터를 주고 받을시 따로 설정하지 않으면 CORS 에러를 만나게 됩니다
  - 브라우저는 보안상의 이유로 스크립트에서 시작한 교차출처 HTTP 요청을 제한한다
- 따라서 다른 서버의 리소스를 불러오기 위해서는 그 출처에서 CORS에 대한 내용을 Response의 헤더에 추가해줘야합니다
  - Access-Control-Allow-Origin: 요청을 보내는 페이지의 출처 [*, 도메인]
  - Access-Control-Allow-Methods: 요청을 허용하는 메소드.Default: GET, POST
  - Access-Control-Max-Age: 클라이언트에서 preflight 요청(서버의 응답 가능여부에 대한 확인) 결과를 저장할 시간
  - Access-Control-Allow-Headers: 요청을 허용하는 헤더

## OAuth 2.0 의 흐름에 대해 간단히 설명해주세요

- 1. 사용자가 클라이언트에게 사용 요청을 보낸다
- 2. 클라는 권한서버에 권한 부여 승인 코드 요청(response_type=code로 지정하여 요청)을 보낸다
- 3. 이후 클라는 권한서버에서 제공하는 로그인 페이지를 띄워 사용자에게 보여준다
- 4. 사용자가 로그인 하면 권한 서버는 (2) 권한 부여 승인 코드 요청에 전달받은 redirect_url로 Authorization Code를 전달한다
- 5. Authorization Code는 권한 서버에게 제공하는 API를 통해 Access Token 으로 교환된다

## 동적쿼리란 무엇이고 언제 동적 쿼리를 사용하나요?

- 동적쿼리란 실행시에 특정조건이나 상황에 따라 쿼리 문장이 변경되어 실행되는 쿼리문을 말합니다
  컴파일시에 SQL 문장을 확정할 수 없는 경우에 사용합니다. 실행 시점에 따라 where 절에 조건이 달라질 때 사용합니다

## CSRF(Cross-site request forgery)에 대해 설명하고, 이를 막기 위한 방법에 대해 설명해주세요

- 사이트 간 요청 위조의 약자로 웹 어플리케이션 취약점 중 하나로 공격자가 의도한 대로 사용자가 행동하게 하여 특정 웹페이지를 보안에 취약하게 한다거나 수정, 삭제 등의 작업을 하게 만드는 공격방법을 의미합니다
- 대응방안
  - 1. 사용자의 요청에 referrer를 확인하여 도메인이 일치하는지 확인하는 방법으로 공격을 방어
    - 요청 헤더(request header)에서 referrer 정보를 확인할 수 있음
    - 같은 도메인에서 들어오는 접속은 허용하나 다른 도메인에서 호출할 때는 차단하는 개념
  - 2. 상태를 변화시키는 POST, PUT 등이 요청에 대해 csrf 토큰이 포함되어야만 요청을 처리하여 공격을 방어
- 공격과정
  - 1. 옵션 관리자 중 한 명이 권한을 가진채 회사 내에서 작업을 하던 중 메일을 조회한다 (로그인이 되어있으므로 관리자로서의 유효한 쿠키를 가지고 있음)
  - 2. 해커는 특정 행위를 시키는 태그가 들어간 코드가 담긴 이메일을 보낸다
  - 3. 관리자가 이메일을 열어볼 때, 특정 태그를 포함한 URL이 열린다
  - 4. 해커가 의도한 대로 동작하게 된다

## TDD(Test-Driven-Development)의 개념에 대해 설명해주세요

- TDD는 레드 그린 사이클이라는 3가지 과정을 거칩니다
  - 1. RED: 어떠한 기능을 검증하는 테스트가 실패하는 코드를 작성하고, 실제로 실패하는지 확인한다
  - 2. GREEN: 어떠한 기능을 검증하는 테스트가 통과하는 코드를 작성하고, 실제로 성공하는지 확인한다
  - 3. REFACTOR: 작성한 코드를 깨끗하고 가독성 좋게 고친다
  - 4. REPEAT: 위의 세가지 과정을 반복한다

## 테스트 코드를 작성해야하는 이유에 대해 아는대로 설명해주세요

- 1. 기능의 추가, 변경, 삭제로 인한 영향도를 쉽게 파악가능
- 2. 예상하지 못한 오류에 대한 피드백을 위해
- 3. 좋은 설계로 작성되게끔 코드를 유도
- 4. 기능정의의 문서의 역할
- 5. 실수를 줄여준다

## DDD(Domain-Driven-Design)에서 얘기하는 계층과 각각의 역할에 대해 설명해주세요

- 표현계층(presentation layer): 사용자의 요청에 대해 해석하고 응답하는 일을 책임지는 계층(controller)
  - client로부터 request를 받고 response를 return 하는 API 정의
- 응용계층(application layer): 비즈니스 로직을 정의하고 정상적으로 수행될 수 있도록 도메인 계층과 인프라스트럭처 계층을 연결해주는 역할을 하는 계층(service)
  - transaction 관리, DTO 변환, 모듈간의 연계를 진행
- 도메인계층(domain layer): 비즈니스 규칙, 정보에 대한 실질적인 도메인에 대한 정보를 가지고 있으며 이 모든 것을 책임지는 계층 (entity)
  - Entity를 활용하여 도메인 로직이 진행된다
  - 업무 상황을 반영하여 상태를 제어하는 역할에 집중하는 계층
- 인프라스트럭처 계층(infrastructure layer): 외부와의 통신(orm, db, nosql)을 담당하는 계층 (repository)
  - 해당 계층에서 얻어온 정보를 응용계층 또는 도메인 계층에 전달하는 것을 주 역할로 담당

## MSA(Microservice Architecture)가 뭔지 설명해주세요

- MSA는 1개의 시스템을 독립적으로 배포가능한 각각의 서비스로 분할합니다. 각각의 서비스는 API를 통해 데이터를 주고 받으며 1개의 큰 서비스를 구성합니다
- 장점
  - 일부 서비스에 장애가 발생해도 전체 서비스에 영향을 끼치지 않는다
  - 각각의 서비스들은 서로 다른 언어와 프레임워크로 구성될 수 있다
  - 서비스의 확장이 용이하다
- 단점
  - 서비스가 분리되어 있어 테스트나 트랜잭션 처리 등이 어렵다
  - 서비스 간에 API로 통신하기 때문에 그에 대한 비용이 발생한다
  - 서비스 간의 호출이 연속적이기 때문에 디버깅 및 에러 트레이싱이 어렵다
