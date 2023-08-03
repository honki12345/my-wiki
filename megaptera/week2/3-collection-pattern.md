---
layout  : wiki
title   : Collection Pattern
summary : 
date    : 2023-07-27 00:32:37 +0900
updated : 2023-07-27 00:32:37 +0900
tag     : megaptera week2
toc     : true
public  : true
parent  : [[/megaptera/week2]]
latex   : false
resource: CFA53262-EAC6-4E78-AD40-0896979BCB1E
---
* TOC
{:toc}

## Collection Pattern

- 복수의 리소스를 하나의 그룹으로 묶을 수 있다

### Collection pattern을 쓰지 않는 경우

- `/the-first-post`
- `/test-post`

### Collection Pattern을 쓰는 경우

- `/posts`
  - 게시물 전체를 하나의 URI로 표현
  - 일반적으로 복수형으로 사용
- Collection Pattern에서 요소(element) 선택하기
  - `/posts/the-first` 또는 `/posts/test`
  - `/posts/{id}` 또는 `/posts/:id`

### Resource ID != Post ID

- Resource ID = URI = URL
- POST ID는 Resource ID를 구성하는 요소 중 하나
- POST ID는 posts 그룹 내 식별자 ID

### collection(items)의 element(item) 지정하기

- `/posts/1` -> 복수명으로 그룹명 지정, 다음 개별 아이템ID 지정

### Collection Pattern의 예

#### 특정 게시물에 댓글이 달리는 상황

##### Collection

- `/posts/{post_id}/comments`
- `/comments?post_id={post_id}` - 형태도 가능
  - post ID를 이용해 필터링 한다는 의미
  - URI에서 드러나는 의미가 다를뿐 구현코드나 결과는 동일

##### Element

- `/posts/{post_id}/comments/{id}` - `{id}`는 `{comment_id}`
- `/comments/{id}` - 형태도 가능
  - URI 상에 어떤 게시물에 대한 댓글인지 알기어렵다
  - 댓글 삭제 등 간단한 요청이면 오히려 좋을 수 있다

#### 특정 게시물을 고치는 메시지 전달

- `/posts/{id}/edit` - `Edit Page` 리소스
- `/edit?post_id={post_id}` - 형태도 가능
  - 추후에 `/comments/{id}/edit`와 `/edit?comment_id={comment_id}` 구분이 복잡
- REST API에서는 페이지만 표현하는 일은거의 없으므로 Collection - Element 형태인 `/items`와 `/items/{id}`로도 OK

#### 그룹이 아닌 경우 - 단수형 가능

- `/session`
  - 세션은 하나만 유지된다
  - 다른 세션을 참고할 일도 없다
- `/edit?xxx_id={xxx_id}` - 특정 페이지 유형
  - `/edits/post`, `/edits/comment` 같이 Collection pattern 적용도 가능
  - 하지만 edit 보다는 `page` 리소스로 명확하게 표현하는걸 추천
    - `/pages/edit-xxx`
