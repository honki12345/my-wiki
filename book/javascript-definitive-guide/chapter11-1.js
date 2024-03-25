// 에라토스테네스 체를 사용해 n보다 작은 소수 중 가장 큰 값을 구합니다
function sieve(n) {
  let a = new Uint8Array(n + 1); // x가 배수이면 a[x] = 1 입니다
  let max = Math.floor(Math.sqrt(n)); // 이보다 큰 값은 처리하지 않습니다
  let p = 2; // 2는 첫번째 소수입니다
  while (p <= max) {
    for (let i = 2 * p; i <= n; i += p) {
      a[i] = 1;
    }
    while (a[++p]);
  }
  while (a[n]) n--;
  return n;
}
