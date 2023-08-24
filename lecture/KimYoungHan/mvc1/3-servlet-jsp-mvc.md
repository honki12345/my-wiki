---
layout  : wiki
title   : 서블릿, JSP, MVC 패턴
summary : 
date    : 2023-07-27 00:58:28 +0900
updated : 2023-07-27 00:58:28 +0900
tag     : lecture mvc1
toc     : true
public  : true
parent  : [[/lecture/mvc1]]
latex   : false
resource: 8A565CAC-018B-4BB7-BC94-DADD49F6FC5E
---
* TOC
{:toc}

# 3. 서블릿, JSP, MVC패턴

### MVC패턴

#### 개요

##### 너무 많은 역할

- 하나의 서블릿이나 JSP가 비즈니스 로직과 뷰 렌더링까지 모두 처리하게 되면 너무 많은 역할을 하게되고, 결과적으로 유지보수가 어려워진다.

##### 변경의 라이프 사이클

- 둘 사이(비즈니스 로직과 뷰 렌더링)에 변경의 라이프 사이클이 다르다
  - ex. UI를 일부 수정하는 일과 비즈니스 로직을 수정하는 일은 각각 다르게 발생

#### Model View Controller

- 컨트롤러와 뷰라는 영역으로 서러 역할을 나누는 것

##### 컨트롤러

- HTTP 요청을 받아서 1. 파라미터를 검증하고 2. 비즈니스 로직을 실행한다. 그리고 3. 뷰에 전달할 결과 데이터를 조회해서 모델에 담는다
- 컨트롤러에 비즈니스 로직을 두면 컨트롤러가 너무 많은 역할을 담당한다 -> 비즈니스 로직은 서비스라는 계층을 별도로 만들어 처리
  - 컨트롤러는 비즈니스 로직이 있는 서비스를 호출하는 역할

##### 모델

- 뷰에 출력할 데이터를 담아둔다
  - 뷰가 필요한 데이터를 모두 모델에 담아서 전달해주기에 뷰는 비즈니스 로직이나 데이터 접근을 몰라도 되고 화면을 렌더링 하는 일에 집중할 수 있다

##### 뷰

- 모델에 담겨있는 데이터를 사용해서 화면을 그리는 일에 집중

![mvc패턴2](https://github.com/honki12345/honki12345.github.io/assets/70520674/c2195849-5dae-42fb-a366-23dfc6e08faa)

---

### MVC 패턴 - 적용

#### redirect vs forward

##### 리다이렉트

- 실제 클라이언트(브라우저)에 응답이 나갔다가, 클라이언트가 redirect 경로로 다시 요청한다
- URL 경로도 실제 변경되므로 클라이언트가 인지가능

##### 포워드

- 서버 내부에서 일어나는 호출이기 때문에 클라이언트가 인지 못한다

#### form action 상대경로

- form의 action에 절대경로(`/`로 시작)가 아니라 상대경로(`/`로 시작X)를 사용하면 폼 전송시 **현재 URL이 속한 계층경로** + `상대경로`가 호출된다
