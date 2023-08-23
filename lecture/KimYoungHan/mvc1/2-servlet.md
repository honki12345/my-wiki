---
layout  : wiki
title   : 서블릿
summary : 
date    : 2023-07-27 00:57:59 +0900
updated : 2023-07-27 00:57:59 +0900
tag     : lecture mvc1
toc     : true
public  : true
parent  : [[/lecture/mvc1]]
latex   : false
resource: E672E448-A4A4-4FCB-839D-E6CD76BC5232
---
* TOC
{:toc}

# 2. 서블릿

### Hello 서블릿

#### 서블릿 등록하기

- `@WebServlet` 서블릿 애노테이션
  - name: 서블릿 이름
  - urlPatterns: URL 매핑
- HTTP 요청을 통해 매핑된 URL이 호출되면 서블릿 컨테이너는 다음 메서드를 실행한다  
  `protected void service(HttpServletRequest request, HttpServletResponse response)`

#### HttpServletRequest 역할

- 서블릿은 HTTP요청 메시지를 파싱하고 그 결과를 `HttpServletRequest` 객체에 담아서 제공한다
  - `HttpServletRequest`, `HttpServletResponse`는 HTTP 요청메시지, HTTP 응답메시지를 편리하게 사용하도록 도와주는 객체
- 임시 저장소기능
  - 해당 HTTP 요청이 시작부터 끝날때까지 유지되는 임시저장소 기능
    - 저장: `request.setAttribute(name, value)`
    - 조회: `request.getAttribute(name)`
  - 세션관리기능
    - `request.getSession(create: true)`

---

### HTTP 요청데이터 - 개요

#### 클라이언트에서 서버로 데이터를 전달하는 방법

- GET - 쿼리파라미터
  - /url\*\*?username=hello&age=20
  - 메시지 바디 없이, URL의 쿼리 파라미터에 데이터를 포함해서 전달
  - ex. 검색, 필터, 페이징 등
- POST - HTML Form
  - content-type: application/x-www-form-urlencoded
  - 메시지 바디에 쿼리 파라미터 형식으로 전달 username=hello&age=20
  - ex. 회원가입, 상품주문, HTML Form
- HTTP message body에 데이터 직접 담아서 요청
  - HTTP API에서 주로 사용, JSON, XML, TEXT

#### HTTP 요청데이터 - POST HTML Form

- `application/x-www-form-urlencoded` 형식은 GET - 쿼리 파라미터 형식과 같다 -> 쿼리파라미터 조회 메서드를 그대로 사용가능
- content-type은 HTTP 메시지 바디의 데이터형식

#### HTTP message body

- HTTP 메시지 바디의 데이터는 InputStream을 사용해서 직접 읽을 수 있다
  - inputStream은 byte 코드를 반환한다.
  - byte 코드를 문자(String)으로 변환할려면 문자표(Charset)을 지정해주어야 한다.

---

### HttpServletResponse - 기본사용법

#### HttpServletResponse 역할

- HTTP 응답 메시지 생성
  - HTTP 응답코드 지정
  - 헤더 생성
  - 바디 생성
- Content-Type, 쿠키, Redirect

---

### HTTP 응답데이터 - 단순텍스트, HTML

#### 응답메시지

- 단순 텍스트 응답
  - `text/plain`
- HTML 응답
  - `text/html`
- HTTP API - JSON

