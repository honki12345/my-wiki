# 모두를 위한 리눅스

## 채널

- 명령어를 실행하면 자동으로 표준 입출력 채널이 열린다
- 채널은 데이터가 흐르는 길

## 표준 입출력

- 표준입력(stdin): 프로그램에 데이터를 입력하는 채널
- 표준출력(stdout): 프로그램의 실행결과가 출력되는 채널
- 표준에러출력(stderr): 프로그램 실행 중 발생하는 에러 메시지가 출력
- 실제 명령어에 연결되는 표준 입출력은 사용자가 셸에서 명령어를 실행할 때 지정할 수 있다

## 표준 입출력에 매핑된 숫자

- 0: 표준입력
- 1: 표준 출력
- 2: 표준 에러 출력

## 리다이렉션

- 표준 입출력을 어디로 연결할지 변경하는 것

## 리다이렉션의 기호와 의미

- `< File`: 표준 입력을 FILE로 변경
- `> File`: 표준 출력을 FILE로 변경
- `>> File`: 표준 출력의 출력을 FILE의 끝에 추가
- `2> File`: 표준 에러 출력을 FILE로 변경
- `2>> File`: 표준 에러 출력을 FILE의 끝에 추가
- `> File 2>&1`: 표준 출력과 표준 에러 출력을 FILE로 변경

## 표준 출력과 표준 에러 출력을 함께 리다이렉션

- `ls /xxxx > result.txt 2>&1`

## 리다이렉션으로 파일 덮어쓰기 혹은 이어쓰기

- 이미 존재하는 파일에 표준 출력을 리다이렉션하면 기존 파일을 지우고 덮어쓰게 됩니다
- 이때 `>` 대신 `>>`를 사용하면 덮어쓰지 않고 파일의 끝에 이어 기록합니다
  - `set -o noclobber` 설정도 가능합니다

## /dev/null

- `/dev/null`은 특수파일로써 다음 특성을 가집니다
  - 입력파일로 지정해도 아무 내용도 입력되지 않습니다
  - 출력파일로 지정해도 어떤 내용도 기록되지 않습니다
- 다음과 같을 때 활용합니다
  - 굳이 출력되는 메세지를 확인하지 않아도 되고나 명령어의 실행 시간을 확인할 때 이 방식을 사용

## 파이프라인

- 파이프라인을 사용하면 명령어의 표준 출력을 다른 명령어의 표준 입력으로 연결할 수 있습니다

## 필터명령어

- cat 명령어처럼 표준 입력을 받아들여 표준 출력으로 출력하는 명령어
- 대표적인 필터 명령어
  - cat: 입력 내용을 그대로 출력
  - head: 파일 앞부분을 출력
  - tail: 파일 뒷부분을 출력
  - grep: 검색 패턴에 일치하는 행을 출력
  - sort: 정렬
  - uniq: 중복된 행을 제거하여 출력
  - tac: 역순으로 출력
  - wc: 행 수나 바이트 수를 출력