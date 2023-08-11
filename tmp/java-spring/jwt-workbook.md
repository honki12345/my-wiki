# 자바 웹 개발 워크북 - jwt

### Access Token / Refresh Token 의 의미

#### Access Token

- 입장권에 해당하는 토큰(token)을 API 서버에서는 'Access Token' 이라고 한다
- 특정한 자원에 접근할 권한이 있는지를 검사하기 위한 용도
- Access Token 을 탈취 당한다면 문제가 발생하므로 최대한 유효 시간을 짧게 지정하고 사용자에게는 Refresh Token 이란걸 같이 생성해 주어 필요할 시 다시 Access Token 을 발급 받을 수 있도록 한다
    - Access Token 을 작성할 때는 기본적으로 암호화나 인코딩 처리가 필요

![image-20230809203506755](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230809203506755.png)

#### 만료되는 상황

![image-20230809203611505](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230809203611505.png)

![image-20230809203704427](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230809203704427.png)

#### 예제 프로젝트 구현내용

- Access Token  과 Refresh Token 의 생성처리
- Access Token 이 만료되었을 때의 처리
    - Refresh Token 의 검사와 만료가 얼마 남지 않은 Refresh Token의 갱신
        새로운 Access Token 의 생성



### 토큰 인증을 위한 시큐리티 필터

- 사용자가 자신의 아이디와 패스워드를 이용해서 Access Token 과 Refresh Token 을 얻으려는 단계 구현
- 사용자가 Access Token 을 이용해서 컨트롤러를 호출하고자 할 때 인증과 권한을 체크하는 기능 구현

#### 인증과 JWT 발행 처리

- JWT 문자열 발행은 컨트롤러도 이용할 수 있지만 시큐리티의 AbstractAuthenticationProcessing Filter 를 이용하면 좀 더 완전한 분리가 가능
- 예제에서는 APILoginFilter 라는 필터를 이용해 인증단계를 처리하고 인증에 성공했을 때 Access Token과 Refresh Token 을 전송



### JWT 문자열의 생성과 검증

#### JWT

- JWT는 인코딩된 문자열입니다
- JWT는 크게 헤더, 페이로드, 서명으로 구분자는 `.`로 나누어져있습니다.
- 페이로드에는 클레임(claim)이라 불리는 key/value로 구성된 정보들을 저장합니다

##### 장점

- 중앙의 인증서버, 데이터스토어에 대한 의존성이 없음 --> 시스템 수평 확장에 유리하다
- Base 64 URL Safe Encoding을 사용하므로 URL, Cookie, Header 모두에 사용 가능

##### 단점

- Payload 의 정보가 많아지면 네트워크 사용량 증가
- 토큰이 클라이언트에 저장, 서버에서 클라이언트의 토큰을 조작할 수 없음

##### Header

- Signature 를 해싱하기 위한 알고리즘 정보

##### Payload

- 서버와 클라이언트가 주고 받는, 시스템에서 실제로 사용될 정보

##### Signature

- 토큰의 유효성 검증을 위한 문자열



#### jjwt 라이브러리

- 어떻게 JWT를 생성하고 넘겨받은 JWT를 확인할 수 있는가?
- jjwt를 이용해서 JWT를 생성하고 검증하도록 한다



#### JWT 문자열 검증

- JWT 문자열을 검증할 때 가장 중요한 부분은 여러 종류의 예외가 발생하고 발생하는 예외를 JwtException 이라는 상위 타입의 예외로 던지도록 구성한다는 점
- 검증은 JWT 문자열 자체의 구성문제, 유효시간 만료, 서명의 문제 등등이 있습니다. 이러한 검증은 라이브러리의 Jwts.parser()를 이용해서 처리합니다



#### Access Token 검증필터

- 특정 경로 호출했을 때 이 토큰들을 검사하고 문제 없을 때만 접근가능하도록 구성

###### 시나리오 - 예외처리

- Access Token 이 없는 경우 - 토큰이 없다는 메시지 전달
- Access Token 이 잘못된 경우 - 잘못된 토큰이라는 메시지 전달 필요
- Access Token 이 존재하지만 만료된 경우  - 갱신하라는 메시지

##### Access Token 의 추출과 검증

- Access Token 의 값은 HTTP Header 중에 `Authorization` 을 이용
- `Authorization` 헤더는 `type + 인증값` 형태로 작성되는데 OAuth나 JWT는 `Bearer` 타입 사용



---

### 튜토리얼

#### TokenProvider

- 토큰의 생성, 토큰의 유효성 검증을 담당
- createToken() - Authentication 객체의 권한정보를 이용해서 토큰을 생성하는 메소드 
- getAuthentication(String token) - 토큰에 담겨있는 정보를 이용해 Authentication  객체를 리턴하는 메소드
- vadidateToken(String token) - 토큰의 유효성 검증을 수행



#### JwtFilter

- JWT 를 위한 커스텀 필터
- JWT 토큰의 인증정보를 (현재 실행중인 환경의) SecurityContext 에 저장하는 역할
- resolveToken(HttpServletRequest request) - Request Header 에서 토큰 정보를 꺼내오기 위한 메소드

- SecurityConfig 에서 http.addFilterBefore(JwtFilter, UsernamePasswordAuthenticationFilter.class)



#### JwtAuthenticationEntryPoint

- 유효한 자격증명을 제공하지 않고 접근하려 할 때 401 Unauthorizaed 에러 리턴

#### JwtAccessDeniedHandler

- 필요한 권한이 존재하지 않는 경우에 403 Forbidden 에러 리턴



---

## 할일 

- 외부와의 통신에 사용할 DTO 클래스
- Repository 관련 코드 생성
- 로그인 API, 관련 로직 생성

####  TokenDto

- Token 정보를 Response 할 때 사용 

#### UserDetailsService

- loadUserByUsername() - 로그인 시에 DB에서 유저정보와 권한정보를 가져온다
  해당 정보를 기반으로 userdetails.User 객체를 생성해서 리턴한다

#### AuthController

- TokenProvider, AuthenticationManagerBuilder 를 주입받는다
- DTO를 통해 username, pwd 를 받고 이를 이용해 UsernamePasswordAuthenticationToken 생성
  authenticationToken 을 이용해서 Authentication 객체를 생성하기 위해 AuthenticationManagerBuilder.getObject().authenticate 메소드가 실행된다
  (이때 CustomeUserDetailsService.loadUserByUsername 메소드가 실행된다)
  Authentication 객체가 생성되고 이를 SecurityContext 에 저장하고 Authentication 객체를 tokenProvider.createToken() 를 통해 JWT Token 을 생성 
  Header, Body 에 만든 JWT Token 을 주입



---

### SecurityUtil

- getCurrentUsername() - Security Context 의 Authentication 객체를 이용해 username 을 리턴
  Security Context 에 Authentication 객체가 저장되는 시점은 JwtFilter 의 doFilter 메소드에서 request 가 들어올 때 Securitycontext 에 Authentication 객체를 저장해서 사용하게 된다
