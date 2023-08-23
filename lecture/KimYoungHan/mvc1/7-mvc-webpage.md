---
layout  : wiki
title   : 스프링 MVC - 웹페이지 만들기
summary : 
date    : 2023-07-27 01:00:57 +0900
updated : 2023-07-27 01:00:57 +0900
tag     : lecture mvc1
toc     : true
public  : true
parent  : [[/lecture/mvc1]]
latex   : false
resource: 1AE6FDDE-BA4D-437E-B74B-DD0268888E85
---
* TOC
{:toc}

# 7. 스프링 MVC - 웹 페이지 만들기

### 타임리프 간단히 알아보기

#### 타임리프 핵심

- `th:xxx`가 붙은 부분은 서버사이드에서 렌더링되고, 기존 것을 대체한다
- `th:xxx`이 없으면 기존 html의 속성이 그대로 사용된다
- HTML을 서버 연동 없이 열었을 때, `th:xxx`가 있어도 웹 브라우저는 `th:` 속성을 알지 못해 무시한다 -> HTML 파일보기 유지

#### URL 링크 표현식 - @{...}

- `@{...}`: 타임리프는 URL 링크를 사용하는 경우 사용한다. URL 링크표현식
- URL 링크 표현식을 사용하면 서블릿 컨텍스트를 자동으로 포함한다
- pathvariable 또는 쿼리파리미터도 생성가능
  - `th:href="@{/basic/items/{itemId}(itemId=${item.id})}"`
  - `th:href="@{/basic/items/{itemId}(itemId=${item.id}, query='test')}"`
    - 생성링크: `http://localhost:8080/basic/items/1?query=test`
- 리터럴 대체문법 활용
  - `th:href="@{|/basic/items/${item.id}|}:`

#### 리터럴 대체 - |...|

- 타임리프에서 문자와 표현식 등은 분리되어 있기 때문에 더해서 사용해야 한다
  - `<span th:text="'Welcome , ' + ${user.name} + '!'">`
- 리터럴 대체 문법 적용
  - `<span th:text="|Welcome , ${user.name}!|"`>

#### 반복출력 - th:each

- `<tr th:each="item : ${items}">`
  - 모델에 포함된 `items` 컬렉션 데이터를 이용할 수 있다

#### 변수 표현식 - ${...}

- `<td th:text="${item.price}">10000</td>`
  - 모델에 포함된 값이나 타임리프 변수로 선언한 값을 조회

#### 내용 변경 - th:text

- `<td th:text="${item.price}">10000</td>`
  - 내용의 값을 `th:text`의 값으로 변경

#### th:action

- We use th:action to provide the form action URL

---

### PRG Post/Redirect/Get

#### 새로고침

- 웹 브라우저의 새로고침은 마지막에 서버에 전송한 데이터를 다시 전송한다
  - ex. 상품등록페이지에서 form 형식에 맞게 입력 후 제출을 하면 `POST /add` + 상품 데이터를 서버로 전송한다. 이때 다시 새로고침을 선택하면 마지막으로 전송한 `POST /add` + 상품 데이터를 다시 전송한다

#### RedirectAttributes

- `RedirectAttributes`를 사용하면 URL 인코딩도 해주고, `pathVariable`, 쿼리 파라미터까지 처리해준다

```java
@PostMapping("/add")
public String addItemV6(Item item, RedirectAttributes redirectAttributes) {
    Item savedItem = itemRepository.save(item);
    redirectAttributes.addAttribute("itemId", savedItem.getId());
    redirectAttributes.addAttribute("status", true);
    return "redirect:/basic/items/{itemId}";
}
```

- `redirect:/basic/items/{itemId}`
  - pathVariable 바인딩: `{itemId}`
  - 나머지는 쿼리 파라미터로 처리: `?status=true`

