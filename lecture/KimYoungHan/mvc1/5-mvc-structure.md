---
layout  : wiki
title   : 스프링 MVC - 구조이해
summary : 
date    : 2023-07-27 00:59:50 +0900
updated : 2023-07-27 00:59:50 +0900
tag     : lecture mvc1
toc     : true
public  : true
parent  : [[/lecture/mvc1]]
latex   : false
resource: E8411DD2-7E36-49B2-BF4A-F6141DD09B02
---
* TOC
{:toc}

# 5. 스프링 MVC - 구조이해

### 스프링 MVC 전체구조

![MVC구조이미지.png](https://github.com/honki12345/honki12345.github.io/assets/70520674/eb629ec1-48b6-4552-b88d-8633072d4f06)

#### DispatcherServlet 구조 살펴보기

- 서블릿으로 동작
  - `DispatcherServlet` -> `FrameworkServlet` -> `HttpServletBean` -> `HttpServlet`
- 스스프링 부트는 `DispatcherServlet`를 서블릿으로 자동 등록하면서 모든 경로(`urlPatterns="/"`)에 매핑
  - 자세한 경로가 우선순위가 높기에 등록한 서블릿도 함께 동작
- 서블릿이 호출되면 `HttpServlet`이 제공하는 `service()`가 호출
- 스프링 MVC는 `FrameworkServlet`의 `service()` 오버라이드
  - `DispatcherServlet.doDispatch()` 호출

#### 동작순서

1. 핸들러 매핑으로 핸들러조회: 핸들러매핑을 통해 요청 URL에 매핑된 핸들러(컨트롤러) 조회
2. 핸들러 어댑터 조회: 핸들러를 실행할 수 있는 핸들러 어댑터를 조회
3. 핸들러 어댑터 실행
4. 핸들러 실행: 핸들러 어댑터가 실제 핸들러를 실행
5. ModelAndView 반환: 핸들러 어댑터는 핸들러가 반환하는 정보를 ModelAndView로 변환해서 반환
6. viewResolver 호출
7. view 반환: 뷰 리졸버는 뷰의 논리 이름을 물리 이름으로 바꾸고, 렌더링 역할을 담당하는 뷰 객체를 반환
8. 뷰 레넏링

#### HandlerMapping

- RequestMappingHandlerMapping: 어노테이션 기반의 컨트롤러인 @RequestMapping에서 사용
- BeanNameUrlHandlerMapping: 스프링 빈의 이름으로 핸들러를 찾는다

#### HandlerAdapter

- RequestMappingHandlerAdapter: 어노테이션 기반의 컨트롤러인 @RequestMapping에서 사용
- HttpRequestHandlerAdapter: HttpRequestHandler 처리

#### 뷰 리졸버 동작방식

1. 핸들러 어댑터 호출: 핸들러 어댑터를 통해 논리 뷰 이름 획득
2. ViewResolver 호출
3. InternalResourceViewResolver: 이 뷰 리졸버는 `InternalResourceView` 반환
4. view.render()

