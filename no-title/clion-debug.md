# CLion Debugger

## Fundamentals

- set breakpoints
  - 단축키: ctrl + F8

---

- thread 확인도 가능

---

- step over
  - single step
- step into
  - into functions
- step out
  - executes to the end of the current function and out
- force step over
  - they ignore any break point
- force run to cursor
  - they ignore any break point
- force step into
  - into a function even if there's no source code
- exception breakpoint

--

## Beyond the basics: part1 - suspended

- 디버깅의 기능을 두 개의 카테고리로 나눌 수 있다
  - static part
  - dynamic part

---

- examine the value

---

- set variables
  - 오른쪽 마우스 => `set value`

---

- disable automatic evaluation 

---

- inspect variable
  - 다른 stack frame이나 thread로 가더라도 유지함

---

- evaluate expression
  - variable 값 또는 함수호출 테스트 가능
  - multi line editor 가능

---

- watch
  - pinned

---

- jump to source
  - 어디서 선언되었는지

---

- hex value

---

- memory view
  - show addresses or hide addresses

---

## Beyond the basics: part2 - dynamic

- make break points conditional by adding boolean expression

---

- breakpoint disable/ enable
- breakpoint suspend execution
  - prinft debugging 일종
  - stack trace 도 가능하다
  - evaluate & logging도 가능
  - remove once hit
  - disable unitl hitting the following breakpoint

---

- breakpoint configuration

---

- watch point

---

- drag arrow position to jump to 
  - set execution point to cursor

## Beyond the basics: part3 - beyond local

- `.lldbinit`
