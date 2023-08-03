---
layout  : wiki
title   : Collection Pattern 적용
summary : 
date    : 2023-07-27 00:33:43 +0900
updated : 2023-07-27 00:33:43 +0900
tag     : megaptera week2
toc     : true
public  : true
parent  : [[/megaptera/week2]]
latex   : false
resource: 81DB5560-6FF4-40F6-9F23-8DEF0CDFFDC0
---
* TOC
{:toc}

## CRUD

데이터 처리 기능

1. Create
2. Read
3. Update
4. Delete

### CRUD 표현

- Collection Pattern과 HTTP Method를 이용해 CRUD를 표현할 수 있다

1. GET -> Read
2. POST -> Create
3. PUT, PATCH -> Update
4. DELETE -> Delete

#### CRUD 표현예시 - 게시물

1. `GET /posts` -> 게시물 목록 (Read, Collection) -> List (관습적 표현)
2. `GET /posts/{id}` -> 게시물 상세 (Read, Element) -> Detail (관습적 표현)
3. `POST /posts` -> 게시물 생성  (Create) -> 보통 Post ID는 서버에서 생성
4. `PUT 또는 PATCH /posts/{id}` -> 게시물 수정 (Update, Element)
5. `DELETE /posts/{id}` -> 게시물 삭제 (Delete, Element)

#### CRUD 표현예시 - 댓글

1. `GET /comments` -> 전체 댓글 목록
2. `GET /comments?post_id={post_id}` -> 특정 게시물에 대한 댓글 목록  
   `GET /comments/{id}`도 가능
3. `POST /comments` -> 댓글 생성 -> 어떤 게시물의 댓글? -> Body에 Post ID정보를 담는다  
   `POST /comments?post_id={post_id}`도 가능
4. `PUT 또는 PATCH /comments/{id}` -> 댓글 수정
5. `DELETE /posts/{post_id}/comments/{id}` -> 특정 게시물의 특정 댓글 삭제

#### CRUD 표현예시 - 로그인/로그아웃

- 로그인과 로그아웃은 세션으로 리소스를 표현한다

1. `POST /session` -> 세션 생성 = 로그인
2. `DELETE /session` -> 세션 파괴 = 로그아웃
3. `GET /session` 또는`GET /users/me` 를 통해 사용자정보 확인

## CQS

CRUD에서 Command와 Query로 나눌 수 있다

- Command: Create, Update, Delete
  - 행위 후 상태가 변한다
  - 안전하지 않다
- Query: Read
  - 행위 후 상태가 변하지 않는다
  - 안전하다. 분산, 캐시 등에 활용가능
