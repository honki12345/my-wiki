# 2주차 스터디(6-7장)

## 06 데이터 압축

### 6.0 데이터 압축

- 디스크에 저장된 데이터 파일의 크기는 (1. 쿼리 처리 성능)과 (2. 백업 및 복구 시간)과 밀접하게 연결된다
  - 쿼리 처리성능: 데이터 파일이 크면 쿼리를 처리하기 위해 **더 많은 데이터 페이지를** InnoDB 버퍼풀로 읽어야 할 수도 있고,
    더티페이지가 **더 자주** 디스크로 기록돼야 한다.
  - 백업과 복구: 데이터 파일이 크면 백업 시간이 오래 걸리고, 복구 시간도 오래 걸린다
  - 결론: 이런 문제점을 해결하기 위해 **데이터압축 기능**을 사용
- MySQL 서버에서 사용 가능한 압축 방식은 (1. 테이블 압축)과 (2. 페이지 압축)이 있다

### 6.1 페이지 압축

- 페이지 압축: Transparent Page Compression
  - 페이지 압축은 디스크에 저장하는 시점에 데이터 페이지가 압축되고,
    디스크에서 데이터 페이지를 읽어올 때 압축이 해제된다
- 책의 페이지 압축 설명은 알아듣지 못하겠어서 생략한다
- 실제 페이지 압축은 많이 사용되지 않는다
  (1.MySQL의 페이지압축은 특정 버전의 운영체제과 하드웨어 자체가 펀치홀 기능을 지원해야하는 점)과
  (2.파일 시스템 관련 명령어(유틸리티)가 펀치홀을 지원하지 않는다)

### 6.2 테이블 압축

- 테이블 압축: (페이지 압축과 다르게) 운영체제나 하드웨어에 대한 제약이 없다
- 테이블 압축의 장점과 단점
  - 장점: 디스크의 데이터 파일 크기를 줄일 수 있다
  - 단점: (1. 버퍼풀 공간 활용률이 낮음), (2. 쿼리 처리 성능이 낮음), (3. 빈번한 데이터 변경시 압축률이 떨어짐)

#### 6.2.1 압축 테이블 생성

- 압축 테이블 생성 조건
  - 테이블이 별도의 테이블 스페이스를 사용하도록 한다 -> `innodb_file_per_table` 시스템 변수를 `ON`으로 설정
  - 테이블을 생성할 때 `ROW_FORMAT=COMPRESSED` 옵션을 명시한다
  - `KEY_BLOCK_SIZE` 옵션을 이용해 압축된 페이지가 저장될 페이지의 크기를 지정한다
- 테이블 압축 방식
  - 원본 데이터 페이지의 압축 결과가 목표크기(`KEY_BLOCK_SIZE`)보다 작거나 같을 때까지 반복해서 스플릿을 하고 압축을 시도한다
    - 목표 크기가 잘못 설정되면 MySQL 서버의 처리 성능이 급격히 떨어질 수 있다 -> 버퍼풀에서 디스크로 기록되기 전에 압축하는 과정에 시간이 오래 걸리게 된다

#### 6.2.2 KEY_BLOCK_SIZE 결정

- 테이블 압축에서 가장 중요한 부분은 압축된 결과가 어느정도 될지 예측해서 **`KEY_BLOCK_SIZE`를 결정하는 것이다**
  - 솔루션: `KEY_BLOCK_SIZE`를 4KB 또는 8KB로 테이블을 생성해서 샘플 데이터를 저장해보고 적절한지 판단한다
    이때 샘플 데이터가 많으면 많을 수록 정확한 테스트가 가능하다. 최소한 테이블의 데이터 페이지가 10개 정도는 되도록 데이터를 생성한다
- `KEY_BLOCK_SIZE` 선택하기

  - 인덱스 별로 압축횟수와 성공횟수, 압축 실패율을 조회하기

  ```sql
  -- // 인덱스 별로 압축 실행횟수와 성공 횟수 기록
  SET GLOBAL innodb_cmp_per_index_enabled=ON;

  -- // 인덱스 별로 압축 횟수,, 성공횟수, 압축 실패율 조회
  SELECT
    table_name, index_name, compress_ops, compress_ops_ok,
    (compress_ops-compress_oops_ok)/compress_ops * 100 as compress_failure_pct
  FROM information_schema.INNODB_CMP_PER_INDEX;
  ```

  - 압축 실패가 발생하면 디스크로 기록되기 전에 압축하는 과정이 길어진다
    - 상황에 맞게 압축을 고려할 필요가 있다(trade off: 압축되는 데이터 크기 vs 압축 소모시간)
  - 테이블 압축은 zlib을 이용하고 압축 알고리즘은 많은 CPU 자원을 소모한다

#### 6.2.3 압축된 페이지의 버퍼 풀 적재 및 사용

- 버퍼풀 사용에 있어서 테이블 압축의 두가지 문제점
  - (문제1) InnoDB 스토리지 엔진은 압축된 테이블에 대해서 버퍼 풀의 공간을 이중으로 사용한다 -> **메모리 낭비**
    - InnoDB 스토리지 엔진은 압축된 테이블의 데이터 페이지를 버퍼풀에 적재하면 **압축된 상태**와 **압축이 해제된 상태** 2개 버전을 관리한다 -> 읽은 상태 그대로의 데이터 페이지 목록 관리하는 LRU & 압축된 페이지들의 압축 해제버전 Unzip_LRU
  - (해결-문제1) 메모리 공간이 부족하게 되면 LRU 리스트에서 압축된 형태는 유지하고, Unzip_LRU 리스트에서 압축 해제 버전은 제거한다
  - (해결-문제1) 압축된 데이터페이지가 사용되지 않아 LRU 리스트에서 제거될시 Unzip_LRU 리스트에서 (압축 해제 버전도) 함께 제거
  - (해결-문제1) Disk IO 사용량이 높은 서버에서는 가능한 Unzip_LRU 비율을 낮춘다
  - (문제2) 압축 및 압축 해제 작업은 CPU가 상대적으로 많이 소모한다
  - (해결-문제2) 압축된 데이터 페이지가 자주 사용되면 Unzip_LRU 리스트에 해당 페이지를 계속 유지하여 압축 및 압축 해제 작업을 최소화
  - (해결-문제2) CPU 사용량이 높은 서버에서는 Unzip_LRU 비율을 높혀 압축과 압축해제를 피한다

#### 6.2.4 테이블 압축 관련 설정

- 테이블 압축과 연관된 시스템 변수
  - `innodb_cmp_per_index_enabled`: 테이블 압축이 사용된 테이블의 모든 인덱스별로 압축 성공 및 압축 실행 횟수를 수집하도록 설정
    해당 옵션이 비활성화(OFF)되면 테이블 단위의 압축 성공 및 압축 실행횟수만 수집된다
  - `innodb_compression_level`: 압축률을 설정할 수 있다. 0부터 9까지의 값을 선택할 수 있는데, 값이 작을수록 압축 속도는 빨라지지만 저장공간은 커진다. 반대로 값이 커질수록 속도는 느려질 수 있지만 압축률은 높아진다.
    압축 속도가 빨라진다면 CPU자원을 그만큼 적게 소모한다는 의미이다
  - `innodb_compression_failure_threshold_pct`와 `innodb_compression_pad_pct_max`: 테이블 단위로 압축 실패율이 `innodb_compression_failure_threshold_pct` 설정 값보다 커지면 압축을 실행하기 전 원본 데이터 페이지 끝에 의도적으로 일정 크기의 빈공간을 추가한다. 추가된 빈 공간은 압축률을 높여서 압축 결과가 `KEY_BLOCK_SIZE`보다 작아지게 만든다. 압축 실패율이 높아질수록 계속 증가된 크기를 가진다 (`innodb_compression_pad_pct_max`에서 전체 데이터 페이지 크기 대비 패딩공간 비율을 지정)
    결과적으로 압축 실패율을 낮추게 된다.
  - `innodb_log_compressed_pages`: 복구과정 성공을 위해 InnoDB 스토리지 엔진은 압축된 데이터 페이지를 그대로 리두 로그에 기록한다
    이 설정은 리두 로그 용량의 급작스런 증가나 버퍼풀로부터 더티 페이지가 한꺼번에 많이 기록되는 패턴을 만들 수 있다

## 07 데이터 암호화

- MySQL 5.7 버전부터 암호화 기능은 지원되었다. 이때는 데이터파일(테이블스페이스)에 대해서만 암호화 기능이 제공되었다
  MySQL 8.0부터는 데이터 파일뿐만 아니라 리두 로그, 언두로그, 바이너리 로그 등도 모두 암호화 기능을 지원하기 시작하였다

### 7.1 MySQL 서버의 데이터 암호화

- MySQL서버의 암호화 기능은 데이터베이스 서버와 디스크 사이의 데이터 읽고 쓰기 지점에서 암호화 또는 복호화를 수행한다

### 7.1.1 2단계 키 관리

- MySQL TDE에서 암호화 키는 키링 플러그인에 의해 관리된다.
- MySQL 서버의 키링 플러그인은 2단계 키 관리 방식을 사용한다
  MySQL 데이터 암호화는 마스터 키와 테이블스페이스 키(또는 프라이빗 키)를 가진다
  암호화된 테이블이 생성될 때마다 해당 테이블을 위한 테이블스페이스 키를 발급한다
  MySQL는 이때 마스터 키를 이용해 테이블스페이스 키를 암호화해서 각 테이블의 데이터 파일 헤더에 저장한다
- 마스터 키를 변경하면 MySQL 서버는 기존의 마스터 키를 이용해 각 테이블의 테이블스페이스 키를 복호화한 다음 새로운 마스터 키로 암호환한다
  마스터 키가 변경되는동안 MySQL 서버의 **테이블스페이스 키 자체와 데이터 파일의 데이터는 전혀 변경되지 않는다**

### 7.1.2 암호화와 성능

- TDE 방식
  - 한 번 메모리에 적재되면 암호화되지 않은 테이블과 동일한 성능을 보인다
  - 존재하지 않는 데이터 페이지를 읽어야 하는 경우 복호화 과정을 거친다
  - 암호화된 테이블이 변경되면 다시 디스크에 동기화될 때 암호화 과정을 거친다
- AES 암호화 알고리즘
  - 암호화 결과가 평문의 결과와 동일한 크기의 암호문을 반환한다 -> 데이터 파일의 크기는 암호화하지 않은 테이블과 동일한 크기
- 암호호와 압축을 동시에 할 때 -> (1. 압축) (2. 암호화)

### 7.1.3 암호화와 복제

- 소스서버와 레플리카 서버는 서로 각자의 마스터 키와 테이블 스페이스 키를 관리한다
  - 이 결과 복제 멤버들의 데이터 파일은 암호화 되기 전의 값이 동일하더라도 실제 암호화된 데이터가 저장된 데이터 파일의 내용은 달라진다
- MySQL 서버 백업에 TDE의 키링 파일을 백업하지 않은 경우 키링 파일을 찾지 못하면 데이터 복구를 할 수 없다
- MySLQ 서버 백업에 TDE의 키링 파일을 백업한다면 마스터 키 로테이션 명령으로 TDE의 마스터 키가 언제 변경됐는지까지 기억해야한다

### 7.2 keyring_file 플러그인 설치

- TDE 암호화 키 관리 플러그인 방식으로 커뮤니티 에디션에서는 `keyring_file`플러그인만 사용 가능하다
- `keyring_file` 플러그인은 마스터 키를 평문으로 디스크의 파일로 관리한다
  - 마스터 키가 저장된 파일이 외부에 노출되면 암호화가 뚫힌다

### 7.3 테이블 암호화

- 키링 플러그인은 마스터 키를 생성하고 관리하는 부분만 담당한다.
- 어떤 키링 플러그인을 사용하든 암호화된 테이블을 생성하고 활용하는 방법은 동일

### 7.3.1 테이블 생성

- TDE를 이용한 테이블 생성은 일반 테이블 생성 구문과 동일하며 마지막에 `ENCRYPTION='Y'` 옵션만 추가로 넣으면 된다

### 7.3.2 응용 프로그램 암호화와의 비교

- MySQL 서버는 인덱스 관련된 작업을 모두 처리한 후 디스크에 데이터를 저장할 때만 암호화한다
  - 암호화되기 전의 값을 기준으로 정렬, 혹은 검색에 문제가 없다

### 7.3.3 테이블 스페이스 이동

- (1.테이블을 다른 서버로 복사하는 경우) 또는 (2. 특정 테이블의 데이터 파일만 백업했다가 복구하는 경우) 테이블스페이드 이동(Export & Import)를 사용한다
  - TDE가 적용된 암호화된 테이블의 경우 원본 서버와 목적지 서버의 암호화 키가 다르기 때문에 주의해야한다.
- 암호화된 테이블 스페이스 이동 방법
  - 암호화된 테이블의 테이블스페이스 키를 기존 원본 마스터 키로 복호화한 후, 임시로 발급한 마스터 키를 이용해 다시 암호화해서 데이터 파일의 헤더 부분에 저장한다
  - 그러므로 테이블스페이스 이동시 임시 마스터 키가 저장된 `*.cfp` 파일을 함께 복사해야 한다

### 7.4 언두 로그 및 리두 로그 암호화

- 테이블의 암호화 적용시
  - 디스크로 저장되는 데이터는 암호화
  - 메모리에 존재하는 데이터는 평문
  - 데이터 파일 이외의 디스크 파일로 기록되는 경우는 평문 (e.g. 리두 로그, 언두 로그, 바이너리 로그)
- MySQL 8.0.16 버전부터는 InnoDB 스토리지 엔진의 리두 로그와 언두 로그를 암호화된 상태로 저장할 수 있다
- 주의: 암호화를 활성화했다가 비활성화해도 암호화에 사용된 키가 필요하다
  - 리두로그/ 언두로그 암호화 활성시 그때부터 생성되는 리두 로그/ 언두로그만 암호화된다
  - 리두로그/ 언두로그 암호화 비활성시 그때부터 생성되는 리두 로그/ 언두로그만 평문으로 저장된다

### 7.5 바이너리 로그 암호화

- 바이너리 로그와 릴레이 로그 파일 암호화 기능은 **디스크에 저장된 로그 파일에 대한 암호화만 담당**하고
  메모리 내부 또는 네트워크 구간(소스 서버와 네플리카 서버 간)에서는 로그 데이터를 암호화 하지 않는다
- 바이너리 로그와 릴레이 로그 파일의 데이터는 파일 키(File Key)로 암호화 해서 디스크로 저장하고,
  파일 키는 `바이너리 로그 암호화 키`로 암호화해서 각 바이너리 로그와 릴레이 로그 파일의 헤더에 저장

### 7.5.3 mysqlbinlog 도구활용

- 바이너리 로그 파일의 내용을 볼 수 있는 방법은 `mysqlbinlog` 도구가 MySQL 서버에 접속해서 바이너리 로그를 가져오는 수 밖에 없다