# 데이터베이스 3주차 스터디노트

## 면접예상질문

### index

#### 랜덤 I/O와 순차 I/O에 대해서 설명해주세요

![image-20230811203349028](C:\Users\iui47\dev\my-wiki\면접대비\database\week03.assets\image-20230811203349028.png)

- 랜덤 I/O 는 데이터를 임의의 위치에서 읽거나 쓰는 작업
- 순차 I/O 는 데이터를 연속적인 블록으로 순차적으로 읽거나 쓰는 작업
- 공통점은 HDD 의 플래터(원판) 을 돌려서 읽어야 할 데이터가 저장된 위치로 디스크 헤더를 이동시킨 다음 데이터의 행위를 포함한다
- 차이점은 디스크 헤더의 위치 이동횟수
    - 랜덤 /O 는 페이지, 즉 데이터를 디스크에 쓰기 위해 `매번` 디스크 헤더를 움직여서 쓰고 쓸 위치로 이동시키는 시스템 콜을 호출
    - 순차 I/O 는 매번 헤더를 이동시킬 필요가 없는 작업이 동반

#### 인덱스에 대해서 설명해주세요

- 원하는 데이터를 빨리 찾기 위해 투플의 키 값에 대한 물리적 위치를 기록해둔 자료구조

#### 인덱스를 사용해본 경험에 대해서 설명해주세요

#### 인덱스의 동작방식에 대해서 설명해주세요

- 인덱스는 해당 칼럼의 값을 주어진 순서로 미리 정렬해서 보관한다

#### 어떤 기준으로 인덱스를 설정해야할까요?

- 인덱스는 데이터가 변경될 때마다 항상 데이터를 정렬해야하므로 데이터 저장 (INSERT, UPDATE, DELETE) 성능이 안좋아집니다. 반면 빠르게 검색할 수 있어서 데이터 검색 (SELECT) 성능은 좋아집니다.
- 그러므로 데이터 저장의 성능과 검색의 성능 중 어느 것을 더 효율적으로 사용할지 정해야합니다.

- 또한 (중복된 데이터가 적은) 카디널리티가 높은 칼럼을 지정하는 것이 좋다.

#### 인덱스가 잘 동작하고 있는지 어떻게 확인할 수 있을까요?

- `EXPLAIN` 명령어를 통해 데이터베이스 실행 계획을 확인하여 어떤 인덱스를 활용하는지 확인할 수 있습니다

#### 테이블에 인덱스를 많이 설정하면 좋을까요?

- 아니요 index 는 추가적인 저장 공간을 차지하므로 불필요한 index 를 만들지 말아야한다

#### 쿼리 실행 계획에 대해서 설명해주세요. 실행계획을 확인해본 적이 있나요?

- 쿼리 실행 계획이란 쿼리 옵티마이저가 쿼리를 수행할 때 생성한 최적의 처리경로이다.
- `USE INDEX` 와 `FORCE INDEX`  명령어를 통해 해당 인덱스 실행을 `추천`, `강제` 할 수 있다.

#### 커버링 인덱스(covering index)에 대해서 설명해주세요

- 커버링 인덱스란 쿼리를 충족시키는데 필요한 모든 데이터를 갖고 있는 인덱스를 말한다. 그러므로 실제 데이터까지 접근할 필요가 없어 조회성능이 향상된다

#### 다중 칼럼 인덱스(Multi-column)에 대해서 설명해주세요

- 다중칼럼인덱스란 2개 이상의 칼럼을 포함하는 인덱스이다.
- 다중칼럼인덱스는 다음 칼럼은 이전 칼럼에 의존해서 정렬된다. 그러므로 각 칼럼의 위치(순서)는 중요하다.

#### 인덱스에서 사용되는 B-Tree 와 B+Tree에 대해서 설명해주세요

##### B-Tree

- 칼럼의 값을 변경시키지 않고 구조체 내에서 항상 정렬된 상태를 유지

- 루트노드: 최상위노드, 리프노드: 최하단 노드, 브랜치노드: 중간노드
- 부모 노드를 기준으로 왼쪽 자식 노드는 더 작은 값, 오른쪽 자식 노드는 더 큰 값을 갖는다
- 인덱스의 리프노드는 실제 데이터 레코드를 찾아가기 위한 주솟값을 가진다

#### 인덱스에서 사용되는 HashTable 에 대해서 설명해주세요

- Hash 인덱스 알고리즘은 칼럼의 값으로 해시값을 계산해서 인덱싱하는 알고리즘으로, 매우 빠른 검색을 지원합니다.
- 값을 변형해서 인덱싱하므로 전방(Prefix) 일치와 같이 값의 일부, 범위 검색할 때는 해시 인덱스를 사용할 수 없습니다

#### 클러스터드 인덱스와 논클러스터드 인덱스의 차이는 무엇일까요?

- Non-clustered Index
    - 인덱스 키 값에 해당 데이터에 대한 포인터가 존재
    - 인덱스의 구조와 데이터의 행이 서로 독립적
    - 한 테이블에 여러 개 생성 가능
- Clustered Index
    - 데이터를 인덱스로 지정한 칼럼에 맞춰서 정렬
    - 테이블 구조에 영향을 미치는 인덱스이다
    - 한 테이블에 하나만 생성가능

#### 인덱스 사용시 주의해야할 점에 대해서 알려주세요



#### GROUP BY 사용시 인덱스가 걸리는 조건에 대해 설명해주세요

