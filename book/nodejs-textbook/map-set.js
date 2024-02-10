const m = new Map();

m.set("a", "b"); // set(키, 값)으로 Map에 속성 추가
m.set(3, "c"); // 문자열이 아닌 값을 키로 사용 가능합니다
const d = {};
m.set(d, "e"); // 객체도 키 가 됩니다

m.get(d); // get(키)로 속성값 조회
console.log(m.get(d));

m.size; // size로 속성 개수 조회
console.log(m.size);

for (const [k, v] of m) {
  console.log(k, v);
}

m.forEach((v, k) => {
  console.log(k, v);
});

m.has(d); // has(키)로 속성 존재 여부 확인
console.log(m.has(d));

m.delete(d); // delete(키)로 속성을 삭제합니다
m.clear(); // clear() 로 전부 제거합니다
console.log(m.size);

const s = new Set();
s.add(false);
s.add(1);
s.add("1");
s.add(1);
s.add(2);

console.log(s.size);

s.has(1);
console.log(s.has(1));

for (const a of s) {
  console.log(a);
}

s.forEach((a) => {
  console.log(a);
});

s.delete(2);
s.clear();

const arr = [1, 3, 2, 7, 2, 6, 3, 5];

const set = new Set(arr);
const result = Array.from(set);
console.log(result);
