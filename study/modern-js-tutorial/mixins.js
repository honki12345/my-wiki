// 믹스인
let sayHiMixin = {
  sayHi() {
    console.log(`Hello ${this.name}`);
  },
  sayBye() {
    console.log(`Bye ${this.name}`);
  },
};

// 사용법:
class User {
  constructor(params) {
    this.name = name;
  }
}

// 메서드 복사
Object.assign(User.prototype, sayHiMixin);

let sayMixin = {
  say(phrase) {
    console.log(phrase);
  },
};

let eventMixin = {
  /* 
    이벤트 구독
    사용패턴: menu.on('select', function(item) {...}) */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /* 
  구독취소
  사용패턴: menu.off('select', handler) */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.handler; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /* 
  주어진 이름과 데이터를 기반으로 이벤트 생성
  사용패턴: this.trigger('select', data1, data2); */
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return;
    }

    this._eventHandlers[eventName].forEach((handler) =>
      handler.apply(this, args)
    );
  },
};

class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}

// 이벤트 관련 메서드가 구현된 믹스인 추가
Object.assign(Menu.prototype, eventMixin);
let menu = new Menu();

// 메뉴 항목을 선택할 때 호출될 핸들러 추가
menu.on("select", (value) => console.log(`선택된 값: ${value}`));

// 이벤트가 트리거 되면 핸들러가 실행됨
menu.choose("123");
