---
layout  : wiki
title   : 데이터베이스 접근 로직 테스트 정의
summary : 
date    : 2023-07-27 00:53:48 +0900
updated : 2023-07-27 00:53:48 +0900
tag     : lecture board
toc     : true
public  : true
parent  : [[/lecture/fastcampus-board]]
latex   : false
resource: 33525933-3967-48A5-A3A8-CF72D0DE048B
---
* TOC
{:toc}

# 게시판 서비스

## 도메인 설계

단수 vs 복수

- 데이터베이스 테이블 명과도 매핑될 수 있는 도메인객체 이름을 단수로 할 것인가, 복수로 할 것인가
  - 단수와 복수에 어떤 이점이 있는지

---

## 데이터베이스 접근 로직 테스트

### 설정

작업환경 설정

- 스프링 데이터 접근기술: JPA
- 데이터베이스 운영: mysql (+ 드라이버)
- 데이터베이스 테스트: h2 (+ 드라이버)

mysql

- 실무에서 널리 쓰이는 데이터베이스
  - 데이터베이스 선택 시 판단 근거가 있어야한다.
  - 여기선 가장 널리 쓰이는 데이터베이스  
    (참고: <https://db-engines.com/en/>)

계정 생성 및 권한설정

```mysql
create user 'fpg123'@'localhost' identified by 'password';
select `user` from `mysql`.user;
show grants for 'fpg123'@'localhost';
grant all on `board`.* to 'fpg123'@'localhost' with grant option ;

flush privileges ;
```

설정

- JPA에 접근하기 위한 application.yaml 수정

---

### JPA

#### 1. 엔티티 클래스&필드 설정

##### 인덱스 설정

```java
@Table(indexes = {

})
```

##### 키 생성

- mysql -> strategy = GenerationType.IDENTITY

##### 엔티티

- 클래스가 아닌 각 필드에 @Setter를 열어둔다
  - primary key나 자동생성 필드에 사용자의 개입 차단
- 클래스에 @Getter를 열어둔다
- 기본생성자가 필요하다
  - 왜?

##### Auditing

- 1. @Configuration + @EnableJpaAuditing
- 2. 어노테이션

  ```java
    @CreatedDate
    private LocalDateTime createdAt; // 생성일시
    @CreatedBy
    private String createdBy; // 생성자
    @LastModifiedDate
    private LocalDateTime modifiedAt; // 수정일시
    @LastModifiedBy
    private String modifiedBy; // 수정자
  ```

- 3. 이름부여 역할 빈 등록

  ```java
    @Bean
    public AuditorAware<String> auditorAware() {
        return () -> Optional.of("fpg123"); //  스프링 시큐리티로 인증 기능을 붙이게 될 때, 수정하자
    }
  ```

#### 2. 생성자(팩토리패턴)

1. 생성자에서 특정 필드만 포함시킨다
2. 생성자를 private으로 제한하고 팩토리 메서드 적용

#### 3. 객체 동등성부여

- unique key 값인 id로 객체 동등성 확인
- 영속화 되지않아 id값을 가지지 않은 객체는 동등성 비교 안하는 정책

#### 양방향 바인딩

- 도메인 데이터와 상관없는 메타 데이터 직전에 양방향 바인딩 필드를 위치
  - 실무에서는 양방향바인딩을 푸는 경우도 많다 -> 데이터 마이그레이션이나 편집이 불편, 운영측면에서 데이터보관 문제
- lombok 의 toString issue
  - 순환참조 (A가 B를 참고할려할 때, B가 A를 참고하는 경우)
- 객체 이름 위에 중요한 순서대로 어노테이션 위치

#### 4. 리포리토리 만들기

- JpaRepository에는 어노테이션 `@Repository` 안 붙여도 된다. `JpaRepository`에 붙어있음

#### 5. 테스트만들기

#### run vs services (intellij)

- run에서 빌드, 테스트하는 로그, services에서는 실행하는 로그 분리가능
- 멀티모듈 프로젝트 시 여러 개의 부트 프로젝트를 services에서 관리가능

---

### 테스트

- 테스트에서 무엇이 동작하는지 무엇을 테스트하고 싶은지 먼저 정의하고 접근
- 예측대로 쿼리문이 나왔는지 확인

#### 슬라이스테스트(@DataJpaTest)

- `JpaConfig`는 따로 ``@Import`
- JUni5 부터 생성자주입가능 (`@DataJpaTest`안의 `@ExtendWith(SpringExtension.class) 덕분`)
- 모든 테스트 메서드는 메서드 단위로 자동으로 `@Transactional`이 걸려있음
  - `@Transactional`는 기본이 롤백임

#### select test

- 데이터가 들어있고 select로 가져온 수가 일치하는지 테스트

#### insert test

- insert 후 개수가 늘었는지 테스트

#### update test

- 기존의 객체를 수정한 후 일어나는 현상테스트
- `assertThat().hasFieldOrPropertyWithValue()`

---

### Git

#### commit

- commit 변경지점을 나누어서 한다

