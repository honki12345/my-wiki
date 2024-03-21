class CoffeeMachine {
  _waterAmount = 0; // 물통에 차 있는 물의 양
  #waterLimit = 200;

  #checkWater(value) {
    if (value < 0) throw new Error();
    if (value > this.#waterLimit) throw new Error();
  }

  set waterAmount(value) {
    if (value < 0) throw new Error("물의 양은 음수가 될 수 없습니다");
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this.power = power;
  }
}

let CoffeeMachine = new CoffeeMachine(100);
