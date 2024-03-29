# 모던 JavaScript 듀토리얼 day03

- 읽을파트: [파트 1 4.7] 심볼형
- 평가: 유익, 잊고 있었는데 핵심을 정리해서 좋았다

---

## [파트 1 4.7] 심볼형

- `Symbol`은 원시형 데이터로, 유일한 식별자를 만드는데 사용합니다
- `Symbol()`을 호출하면 심볼을 만들 수 있습니다. 설명(이름)은 옵션입니다
- 이름이 같더라도 값이 항상 다릅니다
  이름이 같으면 값도 같길 원한다면 전역 레지스트리를 사용해야 합니다
  `Symbol.for(key)`는 `key`를 이름으로 가진 전역 심볼을 반환합니다. 만약 해당 전역 심볼이 없으면 새로운 전역심볼을 만들어 줍니다.
- 주요 유스케이스
  - 1. 객체의 '숨김' 프로퍼티: 외부 스크립트나 라이브러리에 '속한' 객체에 새로운 프로퍼티를 추가해 주고 싶다면 심볼을 만들고, 이를 프로퍼티 키로 사용하면 됩니다.
       키가 심볼인 경우엔 `for .. in`의 대상이 되지 않아서 의도치 않게 프로퍼티가 수정되는 것을 예방할 수 있습니다. 외부 스크립트나 라이브러리는 심볼 정보를 갖지 않고 있어서 프로퍼티에 직접 접근하는 것도 불가능합니다. 심볼형 키를 사용하면 프로퍼티가 우연히라도 사용되거나 덮여씌여지는 걸 예방할 수 있습니다
  - 2. 자바스크립트 내부에서 사용되는 시스템 심볼은 `Symbol.*`로 접근할 수 있습니다. 시스템 심볼을 이용하면 내장 메서드 등의 기본 동작을 입맛대로 변경할 수 있습니다.
