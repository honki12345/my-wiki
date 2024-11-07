# CodeComplete: 9장-의사코드 프로그래밍 프로세스

- 클래스와 루틴을 작성하는 방법
  - 의사코드 프로그래밍 프로세스(pseudocode programming process, PPP)
  - 대안으로는 테스트 주도 개발(tdd), 계약에 의한 설계 등이 있다

---

## 의사코드

- 의사코드란 알고리즘이나 루틴, 클래스, 프로그램이 어떻게 작동할지를 자연어 문장과 같은 비형식적인 표기법으로 기술한 것
- 효과적인 의사코드를 사용하기 위한 지침
  - 구체적인 연산을 정확하게 기술하기 위해 명령문을 사용
  - 특정 프로그래밍 언어의 문법적인 요소를 피한다
  - 의사코드로부터 코드를 거의 자동으로 생성할 수 있을 정도로 의사코드를 작성한다
- 절차
  - 의사코드 작성 -> 의사코드 주위에 코드작성 -> 의사코드를 주석처리

---

## PPP를 이용한 구현

- 활동
  - 루틴을 설계한다
  - 루틴을 구현한다
  - 코드를 검사한다
  - 나머지를 정리한다
  - 필요한 만큼 반복한다

---

## 루틴을 설계한다

- 선행조건을 검사한다
  - 루틴이 해야 할 일이 잘 정의되었는가
  - 전체적인 설계에 잘 어울리는지 검사한다
  - 루틴을 프로젝트의 요구사항에 맞게 호출하는지 확인한다
- 루틴이 해결할 문제를 정의한다
  - 루틴이 해결할 문제를 당장 개발할 수 있을 정도로 자세히 기술한다
  - 다음과 같은 내용이 포함될 수 있다
    - 루틴이 숨길 정보
	- 루틴에 대한 입력
	- 루틴의 출력
	- 루틴이 호출되기 전에 참이어야 하는 **선행조건들**(e.g. 입력값 범위, 초기화된 스트림, 파일디스크립쳐, 버퍼상태)
	- 반환하기 전에 루틴이 참임을 보장하는 **후행조건들**(e.g. 출력값 범위, 초기화된 스트림, 파일디스크립쳐, 버퍼상태)
- 루틴의 이름을 짓는다
  - 루틴은 분명하고 모호하지 않은 이름을 가져야한다. 그러한 이름을 짓는데 어려움을 가진다면 이는 루틴의 목적이 분명하지 않기 때문일 것이다
- 루틴을 작성할 때 어떻게 테스트할 것인지 생각하라
- 표준 라이브러리에서 사용할 수 있는 기능을 조사하라
  - 루틴의 기능 중 일부나 전부를 라이브러리에서 이미 제공하고 있는지를 확인하라
- 오류 처리에 대해서 생각한다 
  - 잘못된 입력이나 다른 루틴에서 반환된 유효하지 않은 값 등에 대해서 생각한다
- 효율성에 대해서 생각한다
  - 루틴이 자원과 속도의 목표를 달성할 수 있도록 설계한다. 자원이나 속도 중 어느 하나가 더 중요하다면 적절히 트레이드오프를 한다
  - 이 두가지 방법을 제외하면 일반적으로 개별적인 루틴 수준에서 효율성을 고려하는 것은 시간 낭비다
- 알고리즘과 데이터형을 조사한다
  - 복잡한 코드를 처음부터 작성하기 전에 알고리즘 책을 뒤져서 이미 사용 가능한 것이 있는지 살펴본다
- 의사코드를 작성하기
  - 의사코드를 작성하는 이유는 전체적인 흐름을 미리 정하는데 있다
  - 일반적인 것부터 시작해서 구체적인 것으로 작업을 진행한다
    - 가장 일반적인 것은 루틴이 해야하는 것(목적)이다. 주석을 생각만큼 매끄럽게 작성할 수 없다는 것은 루틴의 역할을 좀 더 명확하게 이해할 필요가 있음을 반증하는 현상
	- 머리말 주석 예제
	```
	이 루틴은 호출 루틴에서 제공하는 오류 코드에 따라서 오류 메세지를 출력한다
	이 루틴이 메시지를 출력하는 방법은 현재 처리 중인 상태에 따라서 달라진다
	이 루틴은 성공이나 실패를 가리키는 값을 반환한다
	```
	- 루틴에 대한 의사코드 예제
	```
	기본 상태를 "실패"로 설정한다
	오류 코드에 대한 메시지를 검색한다

	만약 오류 코드가 유효하다면
		만약 대화식 방식이라면, 오류 메세지를
		대화식으로 보여주고 성공을 선언한다

		만약 명령줄 방식이라면, 오류 메세지를
		명령줄에 기록하고 성공을 선언한다
	
	만약 오류가 유효하지 않다면, 사용자에게
	내부 오류가 발견되었다고 알린다.

	상태 정보를 반환한다.
	```
- 데이터에 대해서 생각한다
  - 핵심적인 데이터형을 정의하면 루틴의 논리적인 구조를 설계할 때 유용하다
- 의사코드를 검사한다
  - 의사코드를 작성하고 데이터를 설계했다면 작성한 의사코드를 검사한다
    - 다른사람에게 코드를 검토해 달라고 부탁하거나 설명을 들어달라고 부탁한다
  - 의사코드는 자신이 세운 가정과 상위 수준에서 발생하는 실수를 프로그래밍 언어로 작성한 코드보다 분명하게 보여준다
- 의사코드에서 몇가지 아이디어를 내보고 가장 좋은 방법을 선택한다(반복)
  - 코드 작성을 시작하기 전에 의사코드에서 가능한 한 많은 아이디어를 시도해 본다
  - 의사코드를 더 작게 분해할 수 없을 때까지 분해한다. 실제 코드 대신 의사코드를 작성하는 것이 시간낭비처럼 보일 때까지 의사코드를 개성하고 분해한다

---

## 의사코드

- 의사코드란 알고리즘이나 루틴, 클래스, 프로그램이 어떻게 작동할지를 자연어 문장과 같은 비형식적인 표기법으로 기술한 것
- 효과적인 의사코드를 사용하기 위한 지침
  - 구체적인 연산을 정확하게 기술하기 위해 명령문을 사용
  - 특정 프로그래밍 언어의 문법적인 요소를 피한다
  - 의사코드로부터 코드를 거의 자동으로 생성할 수 있을 정도로 의사코드를 작성한다
- 절차
  - 의사코드 작성 -> 의사코드 주위에 코드작성 -> 의사코드를 주석처리

---

## 루틴을 구현한다

- 의사코드를 주석으로 변환한다
- 각 주석 아래에 코드를 채운다
- 코드를 더 나눠야하는지 검사한다
  - 주석 아래에 있는 코드를 새로운 루틴으로 나눈다
  - PPP를 재귀적으로 적용한다

---

## 코드를 검사한다

- 루틴을 설계하고 구현한 후 구현한 코드가 정확한지 확인한다
- 머릿속에서 루틴의 오류를 검사한다
  - 머릿속에서 루틴을 실행하는 것은 어려운 일인데, 그런 이유 때문에라도 루틴을 작게 유지해야 한다
  - 정상적인 경로와 종결점, 모든 예외조건을 검사하고 있는지 확인한다
  - 이 작업을 혼자서 수행한 후 한 명 이상의 동료와 함께 수행한다
- 각 코드의 역할과 그것이 왜 필요한지 이해하도록 한다
- 루틴을 컴파일한다
  - 루틴을 검토하고 나면 루틴을 컴파일한다. 루틴이 제대로 되었다는 확신이 들 때까지 컴파일하지 않도록 한다.
- 코드를 디버거에서 한 단계씩 살펴본다
  - 루틴을 컴파일하고 나면 디버거에 입력하여 각 줄을 한 단계씩 살펴본다. 각 줄의 코드가 예상한 대로 실행되는지 확인한다
- 코드를 테스트한다
- 루틴에 있는 오류를 제거한다

---

## 필요한 만큼 단계를 반복한다

- 루틴의 품질이 좋지 않다면 의사코드 단계로 돌아간다. 고급 프로그래밍은 반복적인 프로세스이니 주저하지말고 구현 작업을 다시 반복하라