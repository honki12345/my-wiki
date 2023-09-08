# 실전! 스프링 데이터 JPA

## 주요메서드

- `getOne(ID)`: 엔티티를 프록시로 조회한다. 내부에서 `EntityManager.getReference()` 호출

## 쿼리메소드 기능

- 조회: find...By, read...By, query...By, get...By
  - e.g. `findHelloBy`처럼 `...`에 식별하기 위한 내용(설명)이 들어가도 된다
- COUNT: count...By 반환타입 `long`
- EXISTS: exists...By 반환타입 `boolean`
- 삭제: delete...By, remove...By 반환타입 `long`
- DISTINCT: findDistinct, findMemberDistinctBy
- LIMIT: findFirst3, findFirst, findTop, findTop3

## `@Query` 값, DTO 반환하기

- 값 반환하기
  - JPA 값 타입(`@Embedded`)도 이 방식으로 조회할 수 있다

```java
@Query("select m.username from Member m")
List<String> findUsernameList();
```

- DTO로 직접 조회
  - JPA의 `new`명령어를 사용한다. 다음과 같이 적절한 생성자가 있어야한다

```java
@Query("select new study.datajpa.dto.MemberDTO(m.id, m.username, t.name) from Member m join m.team t")
List<MemberDTO> findMemberDTO();
```

## 파라미터 바인딩

```java
@Query("select m from Member m where m.username =:name")
Member findMembers(@Param("name") String username);
```

- 컬렉션 파라미터 바인딩

  - `Collection`타입으로 in 절 지원

  ```java
  @Query("select m from Member m where m.username in :names")
  List<Member> findByNames(@Param("names") List<String> names);
  ```

## 반환타입과 조회결과가 일치하지 않을땐?

- 반환타입: 컬렉션
  - 결과없음 -> 빈 컬렉션 반환
- 반환타입: 단건
  - 결과없음: `null`반환  
    JPA에서는 단건 조회할 때 `javax.persistence.NoResultException` 예외가 발생했는데 스프링데이터가 이 예외대신 `null` 반환
  - 결과가 2건 이상: `javax.persistence.NonUniqueResultException` 발생

## 스프링 데이터 JPA 페이징시 반환타입에 따른 추가쿼리

- `org.springframework.data.domain.Page`: 추가 count 쿼리사용

  - count 쿼리 분리가능

  ```java
  @Query(value = "select m from Member m",
        countQuery = "select count(m.username) from Member m")
    Page<Member> findMemberAllCountBy(Pageable pageable);
  ```

- `org.springframework.data.domain.Slice`: 추가 count 쿼리 사용안함. 다음 페이지만 확인가능
- `List`: 추가 count 쿼리 없이 결과만 반환

## 벌크성 수정 삭제 쿼리 `@Modifying`

- 주의사항: 벌크연산은 영속성 컨텍스트를 무시하고 실행하기 때문에, 영속성 컨텍스트에 있는 엔티티의 상태와 DB에 엔티티 상태가 달라질 수 있다
  - 영속성 쿼리 실행 후 영속성컨텍스트 초기화: `@Modifying(clearAutomatically = true)`
  - 1. 영속성 컨텍스트에 엔티티가 없는 상태에서 벌크 연산을 먼저 실행한다
  - 2. 영속성 컨텍스트에 있으면 벌크연산 직후 영속성 컨텍스트를 초기화한다

## EntityGraph

- 엔티티 그래프 기능을 사용하면 JPQL 없이 페치조인을 사용할 수 있다
  - 페치조인의 간편 버전
  - LEFT OUTER JOIN 사용

## JPA Hint & Lock

- JPA Hint: JPA 구현체에게 제공하는 힌트

## 사용자 정의 리포지토리 구현

- 구현클래스
  - 규칙: 리포지토리 인터페이스이름 + `Impl`
  - 스프링 데이터 JPA가 인식해서 스프링 빈으로 등록

## Auditing

- 설정
  - `@EnableJpaAuditing`: (스프링부트) 설정 클래스에 적용
  - `@EntityListeners(AuditingEntityListener.class)`
  - 등록자, 수정자를 처리해주는 `AuditorAware` 스프링 빈 등록
- 어노테이션
  - `@CreatedDate`
  - `@LastModifiedDate`
  - `@CreatedBy`
  - `@LastModifiedBy`

## `persist()` vs `merge()`: 새로운 엔티티를 판별

- `save()` 메서드
  - 새로운 엔티티면 저장(`persist()`)
  - 새로운 엔티티가 아니면 병합(`merge()`) -> 데이터베이스에 쿼리가 한번 더 나간다
- 새로운 엔티티를 판별하는 기본 전략
  - 식별자가 객체라면 `null`인가?
  - 식별자가 자바기본타입이라면 `0`인가?
- `Persistable` 인터페이스를 구현해서 판단 로직 변경가능
- JPA 식별자 생성전략이 직접 할당이면 이미 식별자 값이 있는 상태에서 `save()`가 호출된다  
  이 경우에는 `merge()`가 호출된다 -> `meger()`는 DB를 호출해서 값이 있는지 판별하기 때문에 비효율적(값이 없으면 새 엔티티로 인식)
  - sol) Auditing 등록시간(`@CreatedDate`)를 활용해서 새로운 엔티티 여부를 편리하게 확인할 수 있다
