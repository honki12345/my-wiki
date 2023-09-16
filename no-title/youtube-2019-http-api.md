---
layout  : wiki
title   : HTTP API 설계 후회 고민 - 강의
summary : 
date    : 2023-07-27 00:51:34 +0900
updated : 2023-07-27 00:51:34 +0900
tag     : tmp
toc     : true
public  : true
parent  : [[/tmp]]
latex   : false
resource: CEF09EC8-2E9D-4A76-B07F-32E08F9D1B74
---
* TOC
{:toc}

# 강의정리

## [2019] HTTP API 설계 후회 고민

### RESTful API를 도입해보자

- 내부에서 쓰는 API를 외부에도 공개해보자 -> 실패
- 레퍼런스: REST API 디자인 규칙  
  (링크: <https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=59521830>)
- 레퍼런스 중 2~3장을 주로 확인, 4~7장을 주의깊게 확인하지 않음

### 레퍼런스에서 참고한 규칙 1

- 슬래시(/)는 계층관계를 나타내는데 사용
- 도큐먼트 이름은 단수명사
- 컬렉션 이름은 복수명사
- 컨트롤러 이름은 동사나 동사구  
`ex. http://api.soccer.restapi.org/leagues/seattle/teams/trbuchet/players`

### 레퍼런스에서 참고한 규칙 2

- CRUD 기능을 나타내는 것은 URI에 사용안함
- PUT은 리소스 삽입이나 저장된 리소스 갱신
- PUT은 변경가능한 리소스 갱신
- POST는 컬렉션에 새로운 리소스 생성
- POST는 컨트롤러 실행
- DELETE는 부모로부터 리소스 삭제에 사용

### 리소스 계층도 -> API명세서

#### 문제점

- problem. 프로젝트(project) 하위에 업무(task)가 있는 구조로 설계
- 모든 업무를 보고 싶다면?
  - asterisk사용: `GET /orgs/projects/*/tasks?to={}`
  - 리소스 계층도에서 업무가 프로젝트 하위가 아니라 동등 위치였다면?

---

