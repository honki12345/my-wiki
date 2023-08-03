---
layout  : wiki
title   : uri & mime type
summary : 
date    : 2023-07-27 00:30:43 +0900
updated : 2023-07-27 00:30:43 +0900
tag     : megaptera week2
toc     : true
public  : true
parent  : [[/megaptera/week2]]
latex   : false
resource: 8C36944A-DF6A-46A6-8540-56598795B50A
---
* TOC
{:toc}

## URI (Uniform Resource Identifier)

- 리소스를 식별하는 방법
- 식별할 대는 식별자(identifier = ID)를 활용
- URI와 URL을 크게 구별하지않고 씀

### URI의 부분집합

- URL(Uniform Resource Locator)
  - 리소스의 위치
  - 위치 변경에 취약함
- URN(Uniform Resource Name)
  - 리소스의 `유니크`한 이름
  - 잘 안쓰임

## MIME Type (Content Type, Media Type)

### MIME Type 정의

- `<type>/<subtype>` 형태
- HTTP Headers에 `Content-Type` 속성으로 전달

### MIME 종류

1. `text/plain` -> E-mail에서 자주사용
2. `text/html` -> 웹문서
3. `text/css`
4. `text/javascript`
5. `application/xml` -> 범용 자기서술이기 상대적으로 어렵다
6. `application/atom+xml`
7. `application/json` -> 범용. 자기서술적이기 굉장히 어렵다
8. `application/dns+json`

## 관련문서

### URI와 URL

- [[/megaptera/week1/2-http-client]]


### MIME

- [[/megaptera/week1/1-http-understanding]]
