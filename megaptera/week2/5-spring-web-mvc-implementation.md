---
layout  : wiki
title   : Spring web MVC로 구현
summary : 
date    : 2023-07-27 00:34:03 +0900
updated : 2023-07-27 00:34:03 +0900
tag     : megaptera week2
toc     : true
public  : true
parent  : [[/megaptera/week2]]
latex   : false
resource: 0DCEB376-0172-4A35-BBCE-C23E466DA754
---
* TOC
{:toc}

## Spring Web MVC

- 하나의 컨트롤러 클래스로 하나의 리소스 Collection을 표현
- 리소스를 잘 식별하는 것이 중요하다

### 표현예시 - 게시글
```java
@RestController
@RequestMapping("/posts")
public class PostController {
	@GetMapping("/")
	public String list() {
		return "게시물 목록";
	}

	@GetMapping("/{id}")
	public String detail(@PathVariable("id") String id) {
		return "게시물 상세: " + id;
	}

	@PostMapping("/")
	@ResponseStatus(HttpStatus.CREATED)
	public String create(@RequestBody String body) {
		return "게시물 생성: " + body;
	}

	@PatchMapping("/{id}")
	public String update(@PathVariable("id") String id, @RequestBody String body) {
		return "게시물 수정: " + id + " with " + body;
	}

	@DeleteMapping("/{id}")
	public String delete(@PathVariable("id") String id) {
		return "게시물 삭제: " + id;
	}
}
```

## 관련문서

- [[/lecture/mvc1/6-mvc-basic]]

