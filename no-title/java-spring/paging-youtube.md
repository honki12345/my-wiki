# [스프링부트] 게시판 무작정 따라하기 - 페이징처리

- 주소: https://www.youtube.com/watch?v=RMYez0VqeVo



### 페이징처리

- 정렬순서도 중요하다
- org.springframework.data.domain.Pageable 인터페이스
- @PageableDefault
    - page: default 페이지
    - size: 한 페이지 게시글 수
    - sort: 정렬기준
    - direction: 정렬순서(ex: 오름차순, 내림차순)



#### JPARepository.findAll(Pageable pageable)

- Page<>: 리턴값

### API

- `/board/list`
- `/bo

- `/board/list?page=1&size=10`