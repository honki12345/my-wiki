class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

  //   내장 메서드는 반환 값에 명시된 클래스를 생성자로 사용합니다
  static get [Symbol.species]() {
    return Array;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
