# real mysql 스터디 내용

## 레퍼런스

- tecoble: 트랜잭션 내에 외부 리소스 요청이 담기게 되면 어떤 문제가 발생할까?
  - real mysql 관점에서의 예제코드
  - <https://tecoble.techcourse.co.kr/post/2022-09-20-external-in-transaction/>
  -
- https://tecoble.techcourse.co.kr/post/2020-09-30-event-publish/

## 전체구조

- real-my-sql의 대전제에 대한 의문: 정말 외부 리소스 요청은 트랜잭션 내에서 분리해야할까?
- tecoble: real-my-sql 전제를 충실히 따르고 있는 예제

## tecoble: real-my-sql 전제를 충실히 따르고 있는 예제

- 불필요한 로직이 섞인 트랜잭션
  ![Alt text](images/image.png)
  - 하지만 트랜잭션의 목적은 ACID 속성을 지키는 것이지 단순히 데이터를 영속시키기 위해서만은 아니다
    ![Alt text](images/image-1.png)
  - 데이터커넥션을 사용한다? === 데이터를 영속화한다
    데이터 영속화를 하지 않는건 데이터커넥션이 필요하지 않는, 트랜잭션을 할 필요가 없는 로직이다
- 이걸로 그냥 위에 정리: 여러분들의 생각 나중에 알려주세요
  ![Alt text](images/image-2.png)
