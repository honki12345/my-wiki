---
layout  : wiki
title   : MVC 프레임워크 만들기
summary : 
date    : 2023-07-27 00:59:18 +0900
updated : 2023-07-27 00:59:18 +0900
tag     : lecture mvc1
toc     : true
public  : true
parent  : [[/lecture/mvc1]]
latex   : false
resource: E36D2569-1972-4A56-9848-C33856B418D4
---
* TOC
{:toc}

# 4. MVC 프레임워크 만들기

### 프론트 컨트롤러 패턴소개

![프론트컨트롤러](https://github.com/honki12345/honki12345.github.io/assets/70520674/293d9ee1-e734-4a2f-801b-974010921a3e)

#### 프론트 컨트롤러 패턴 특징

- 프론트컨트롤러 서블릿 하나로 클라이언트의 요청을 받음
- 프론트컨트롤러가 요청에 맞는 컨트롤러를 찾아서 호출
- 진입로가 하나
- 공통 처리 가능
- 프론트 컨트롤러를 제외한 나머지 컨트롤러는 서블릿을 사용하지 않아도 됨

#### 스프링 웹 MVC와 프론트 컨트롤러

- 스프링 웹 mvc의 **DispatcherServlet**이 FrontController패턴으로 구현되어 있다

---

### Model 추가 - v3

#### 서블릿 종속성 제거

- 요청 파라미터 정보를 자바 Map으로 대신 넘기면 컨트롤러에서 서블릿을 걷어낼 수 있다
- HttpServletRequest 객체 대신 별도의 Model 객체 사용

#### 뷰 이름 중복 제거

- 컨트롤러는 **뷰의 논리 이름**을 반환하고 실제 물리 위치의 이름은 프론트컨트롤러가 처리
- 장점: 뷰의 폴더 위치가 바뀌어도 프론트 컨트롤러만 고치면 된다ㅓ

#### 뷰 리졸버

`MyView view = viewResolver(viewname)`

- 컨틀로러가 반환한 논리 뷰 이름을 실제 물리 뷰 경로로 반환
  - 실제 물리 경로가 있는 MyView 객체 반환

`view.render(mv.getModel(), request, response))`

- 뷰 객체를 통해 HTML 화면 렌더링
- 뷰 객체의 render()는 모델정보도 받는다

---

### 단순하고 실용적인 컨트롤러 - v4

#### 모델 객체 전달

- 모델 객체를 프론트 컨틀로러에서 생성해서 넘겨준다

---

### 유연한 컨트롤러1 - v5

#### 어댑터 패턴

![어댑터패턴적용](https://github.com/honki12345/honki12345.github.io/assets/70520674/9e7073b7-f373-4fef-8f52-fe54cba582e8)

- 어댑터 패턴을 활용하면 프론트 컨트롤러가 다양한 방식의 컨트롤러를 처리할 수 있다
- 핸들러: 컨트롤러 보다 더 넓은 범위의 개념인 핸들러로 변경

