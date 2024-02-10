const a = 0;
const b = a || 3; // || 연산자는 falsy 값이면 뒤로 넘어감
console.log(b);

const c = 0;
const d = c ?? 3; // ??연산자는 null과 undefined일 때만 뒤로 넘어감
console.log(d);

const e = null;
const f = e ?? 3;
console.log(f);

const g = undefined;
const h = g ?? 3;
console.log(h); // 3

const a = {};
a.b;

const c = null;
try {
  c.d;
} catch (e) {
  console.error(e);
}
c?.d;

try {
  c.f();
} catch (e) {
  console.error(e);
}
c?.f();

try {
  c[0];
} catch (e) {
  console.error(e);
}
c?.[0];
