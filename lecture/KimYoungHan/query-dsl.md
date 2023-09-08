# 실전! Querydsl

- `EntityManager`로 `JPAQueryFactory`를 생성한다
- Querydsl은 JPQL 빌더이다

## 로그출력

- `spring.jpa.properties.hibernate.show_sql` 옵션은 `System.out`에 하이버네이트 실행 SQL을 남긴다
- `logging.level.org.hibernate.SQL` 옵션은 logger를 통해 하이버네이트 실행 SQL을 남긴다

## Querydsl 동시성

- 스프링프레임워크는 여러 쓰레드에서 동시에 같은 `EntityManager`에 접근해도 트랜잭션마다 별도의 영속성 컨텍스트를 제공하기 때문에 동시성에 안전하다

## Q클래스 인스턴스를 사용하는 2가지 방법

```java
QMember qMember = new QMeber("m")   // 별칭 직접 지정
QMember qMember = QMemeber.member;  // 기본 인스턴스 사용
```

## 동적쿼리 (AND조건 활용)

- `where()`에 파라미터로 검색조건을 추가하면 `AND` 조건이 추가된다
  - 이 경우 `null` 값은 무시된다

## 결과조회

- `fetch()`: 리스트 조회, 데이터 없으면 빈 리스트 반환
- `fetchOne()`: 단 건 조회
  - 결과가 없으면: `null`
  - 결과가 둘 이상이면: `com.querydsl.core.NonUniqueResultException`
- `fetchFirst()`: limit(1).fetchOne()
- `fetchResults()`: 페이징 정보 포함. total count 쿼리 추가 실행
- `fetchCount()`: count 쿼리로 변경해서 count 수 조회

## 조인 - 기본조인

- 조인의 기본문법은 첫번째 파라미터에 조인대상을 지정하고, 두번째 파라미터에 별칭(alias)으로 사용할 Q타입을 지정
  `join(조인 대상, 별칭으로 사용할 Q타입)`

## 조인 - on절

- ON절을 통해 조인대상필터링과 연관관계 없는 엔티티 외부조인이 가능하다
- 일반조인과 on조인 비교
  - 일반조인: `leftJoin(member.team, team)`
  - on조인: `from(member).leftJoin(team).on(xxx)`

## 조인 - 페치조인

- SQL조인을 활용해서 연관된 엔티티를 SQL 한번에 조회하는 기능
  - `join(), leftJoin()` 조인 기능 뒤에 `fetchJoin()`을 추가한다

## 서브쿼리

- JPQL 서브쿼리는 from 절 서브쿼리를 지원하지 않는다

## 상수, 문자 더하기

- `stringValue()`: 문자가 아닌 타입(e.g. enum)들을 문자로 반환할 수 있다

## 프로젝션과 결과 반환

- 프로젝션 대상이 하나면 타입을 명확하게 지정할 수 있다
- 프로젝션 대상이 둘 이상이면 튜플이나 DTO로 조회

## 프로젝션과 결과 반환 - DTO 조회

1. 프로퍼티 접근
2. 필드 직접 접근
3. 생성자 사용

## 프로젝션과 결과 반환 - `@QueryProjection`

- DTO 에 QueryDSL 어노테이션을 유지해야한다는 점과 DTO도 Q파일을 생성해야하는 단점이 있다

```java
List<MemberDTO> result = queryFactory
                        .select(new QMemberDTO(member.username, member.age))
                        .from(member)
                        .fetch();
```

## 동적쿼리

1. BooleanBuilder
2. Where 다중 파라미터
