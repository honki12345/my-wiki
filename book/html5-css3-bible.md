# 모던 웹을 위한 HTML5 + CSS 바이블 3판

## 2. 요소, 태그, 속성

- 태그의 종류
  - 내부에 무언가를 가질 수 있는 태그
    e.g. <이름>무언가<이름>
  - 내부에 무언가를 가질 수 없는 태그
- 태그의 속성
  - 속성은 추가 정보 전달방법

## 3. HTML 페이지의 구조

- HTML5 페이지의 구조
  - `<head>`: 사용자에게 보여지지 않는 부분
  - `<body>`: 사용자에게 보여지는 부분
- 주석

## 4. 본문 글자 태그

- `<p></p>`: 문단(문단 사이에 문단간격이 존재한다)
- `<br/>`: breaks 줄바꿈
- `<hr/>`: horizontal rule 수평줄

## 6. 기본 글자 태그

- `<a></a>`: 문서와 문서를 이동하는 하이퍼텍스트 역할을 한다
  - href 속성으로 링크대상을 지정합니다

## 7. 목록과 테이블태그

### 목록태그: ol, ul, li

- 순서가 있는 목록
  - `<ol></ol>`: ordered list
- 순서가 없는 목록
  - `<ul></ul>`: unordered list
- `<li></li>`: list item

### 테이블태그

- `<table></table>`: 표 자체를 의미
  - border 속성으로 테두리 생성
- `<tr></tr>`: table row 줄 하나
  - `<td></td>`: table data 줄에 들어가목 데이터
  - `<th></th>`: table heading 줄에 들어가는 제목
  - `<td></td>`, `<th></th>` 둘 다 rowspan 또는 colspan 속성가능
    - colspan 속성은 세로 줄로 몇 개를 걸칠지 선택
    - rowspan 속성은 가로 줄로 몇 개를 걸칠지 선택

## 8. 이미지태그와 경로지정

- `<img/>`
  - src 속성으로 대상 지정(URL, data URI)
    - 절대경로, 상대경로
  - alt 속성으로 이미지가 출력되지 않을 때 출력할 글자 지정
  - width, height 속성으로 너비 높이 지정이 가능하다

## 9. 오디오와 비디오

- `<audio><source></source></audio>`
- `<video><source></source></video>`
- src 속성으로 대상 지정
- controls 속성으로 제어도구 표시
- width, height 속성으로 너비 높이 지정이 가능하다
- source 태그로 재생 불가능시 표시

## 10. 입력 양식 태그

- 종이를 한 장을 주고 종이 내부에 내용을 적는다. submit 이름이라는 입력 양식으로 내용을 받는다
- `<form><label></label><input/></form>`
- `<input/>`
  - type 속성
    - button, checkbox, file(파일입력), hidden, image(이미지 형태 생성), password(비밀번호 입력양식), radio, reset(초기화 버튼), submit(제출), text(굴자 입력 양식)
  - value 속성으로 입력 양식 안에 값이 들어간다. 입력 양식 종류마다 다른 결과를 나타낸다
  - inline 태그이므로 한 줄로 생성된다
- `<label></label>`
  - for 속성에 입력 양식의 id 속성을 넣어주면 연동된다

## 11. 입력 양식 태그 (2)

- `<textarea></textarea>`
  - cols 속성은 너비를 나타낸다(세로로 몇 글자가 들어가게 할 지)
  - rows 속성은 몇 줄을 입력받을지 결정한다
  - 값의 여백이 출력된다
- `<select></select>`
  - multiple 속성으로 여러 가지 선택이 가능하다
  - `<optgroup></optgroup>`: option 태그 그룹을 만들어준다
    - label 속성으로 그룹의 제목을 작성
  - `<option></option>`: 선택할 수 있는 요소

## 12. 공간 분할 태그

- 별도의 기능 없이 공간을 분할할 때 사용하는 태그들
  디자인을 입히기 위해 사용한다

  - div 태그와 span 태그

- 공간 분할 방식(display 속성)
  - block: 레고블록을 쌓듯이, 한 줄을 다 차지한다
    - div 태그
    - h1 태그, p 태그
  - inline-block: inline 처럼 전후 줄바꿈 없이 한 줄에 나란히 배치되지만 block 요소처럼 width, height, margin, padding 속성 지정이 가능
    - img 태그
  - inline: 한 줄에 안에 연달아 생기는 것
    width, height 속성은 무시되고 margin과 padding 속성은 좌우 간격만 반영된다. 왜냐하면 컨텐츠의 크기만큼만 공간을 차지하도록 되어 있기 때문
    - span 태그
    - a 태그, input 태그
- 시맨틱 구조 태그 (block 태그)
  - article: 독립적인 글, 컨텐츠
  - aside: 옆에 위치하는 컨텐츠
  - details: 사용자가 보거나 숨길 수 있는 추가 세부 정보
  - header: 문서나 섹션의 머릿글
  - footer: 문서 또는 섹션의 바닥글
  - main: 메인내용, 웹사이트의 본문이나 콘텐츠
  - nav: 웹사이트의 메뉴, 탭, 탐색경로 등
  - section: 문서의 부분, 기본 콘텐츠 내의 특정 주제 또는 부 제목과 관련된 주제별 콘텐츠 그룹

## css 지정

- `<link/ rel="" href="">`: 외부 스타일 파일 지정
- `<style></style>`: 내부 스타일 지정
- `<script></script>`: src 속성 유무로 외부 코드 또는 내부 코드
- css 형식

  ```css
  어떠한 것 {
    어떠한속성: 어떤 값;
    color: red;
  }
  ```

## 14. css 선택자

- 전체 선택자: \*
- 태그 선택자: (특정한 태그 선택) 태그이름
  쉼표를 통해 여러 태그를 지정할 수 있다
- 아이디 선택자: #아이디
- 클래스 선택자: .클래스
  띄어쓰기로 여러 클래스를 지정할 수 있다(e.g. `class= "a b c"`)
- 후손 선택자와 자손선택자

  - 후손: 자기 아래의 모든 태그  
    띄어쓰기를 통해 구분

  ```css
  body li {
    color red;
  }
  ```

  - 자손: 자기 바로 아래의 태그

  ```css
  body > li {
    color red;
  }
  ```

- 속성 선택자: []

  - 값이 없으면 속성을 가지는 모든 태그를 선택
  - 태그선택자와 함께 사용가능 (e.g. `h1[title="test"]`)

  ```css
  [title="test"] {
    color red;
  }
  ```
