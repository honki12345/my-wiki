# 한 번에 끝내는 컴퓨터 공학 전공필수 & 인공지능심화

## 네트워크와 인터넷

- 종단시스템(end system): 네트워크 **송수신** 주체(e.g. PC, 스마트폰)
- 프로토콜(protocol): 두 이종 시스템을 연결하기 위한 규약
- 인터넷: 네트워크와 연결된 상태
- OSI 7 계층: 네트워크 구성요소를 7개의 계층으로 역할을 나눈 표준모델
- IP주소: 통신 자료를 최종적으로 전달하기 위한 송/수신 위치정보
- 패킷교환: 종단간에 전송되는 데이터는 패킷 단위로 전달된다

## 통신을 위한 기본 동작

- 요청(Request): 전송하는 장치에서 상대방에 서비스를 요청
- 인지(Indicate): 수신하는 장치에서 작업요청을 확인
- 응답(Response): 수신하는 장치에서 요청받은 작업에 대해 응답
- 확인(Confirm): 전송하는 장치에서 응답데이터를 최종적으로 확인

## 네트워크 유형

- LAN(Local Area Network)
  - 일정그룹의 지역 네트워크(집, 사무실, 학교 등)
  - 소규모로 묶이며 사설망 등을 구축해 연결
- WAN(Wide Area Network)
  - 원거리 통신망으로 넓은 범위 연결(국가, 대륙 등)
- 크기 유형: LAN < WAN < Internet

![Alt text](images/image.png)

## 네트워크 토폴로지 (구성형태)

![Alt text](images/image-2.png)
![Alt text](images/image-3.png)

## OSI 7 계층 vs TCP/IP

![Alt text](images/image-4.png)
![Alt text](images/image-5.png)

## 물리계층(physical layer)

- 물리적 매체(Transmission medium)를 통한 비트 스트림 전송에 요구되는 기능
- 주요기능

  - 비트의 동기화: 송신자와 수신자는 같은 **클록** 사용
  - 데이터의 속도: 신호가 유지되는 비트의 주기
  - 비트의 표현: 비트를 전송하기 위해 전기적 또는 광학적 신호로 부호화

- 물리계층을 다루기 위한 하드웨어 칩 (이더넷 칩)

![Alt text](images/image-6.png)

### MAC (Medium Access Control)

- 내가 보내는 중에 상대도 보내면 충돌이 발생 -> 자유경쟁 (회선을 경쟁적으로 사용)
- 충돌발생시: 잼신호를 보낸다 -> 일정시간 대기 (16번까지 재시도)

## 데이터 링크계층

- 개요: 노드 대 노드(hop-to-hop) 전달의 책임
- 기능
  - 프레임구성: 네트워크 계층으로부터 받은 비트스트림을 프레임단위로 나눔
  - 물리주소 MAC: 송신자와 수신자의 물리주소를 헤더에 추가
  - 흐름제어: 수신자의 수신 데이터 전송률을 고려하여 데이터 전송하도록 제어
  - 오류제어: 손상 또는 손실된 프레임을 발견/재전송, 트레일러를 통해 이루어짐
  - 접근제어: 주어진 어느 한순간에 하나의 장치만 동작하도록 제어

![Alt text](images/image-7.png)

### 데이터링크계층에서 사용하는 주요 프로토콜

- ARP, RARP

![Alt text](images/image-8.png)

## 네트워크 계층

- 개요: 패킷을 발신지-대-목적지 전달에 대한 책임을 가진다
- 라우팅: 패킷이 최종 목적지로 전달될 수 있도록 경로를 지정하거나 교환가능

### 네트워크 계층 vs 데이터링크 계층

- 데이터링크계층: 물리주소(디바이스 식별, MAC 주소)
- 네트워크계층: 논리주소(IPv4, IPv6)

### 네트워크 계층의 주요 프로토콜

- ICMP: 에러 발생시 에러 발생 원인을 알려주거나 네트워크 상태를 진단해주는 기능
- IGMP: 호스트가 멀티캐스트 그룹 구성원을 인접한 라우터에게 알리는 프로토콜
- IP: 네트워크 기기에서 논리적 식별을 위한 주소

### 네트워크계층 - 발신지 대 목적지 전달

![Alt text](images/image-9.png)

### 네트워크 계층의 전달 흐름

![Alt text](images/image-10.png)

## 전송계층

- 프로세스(프로그램) 대 프로세스 전달에 대한 책임
  - 포트주소 지정
- 분할과 재조립(Segmentation and reassembly)
  - 전달 가능한 세그먼트 단위로 나눔
  - 각 세그먼트는 순서번호를 가지며, 재조립 또는 패킷손실여부 판단
- 연결제어, 흐름제어, 오류제어

### 전송계층의 프로토콜

- TCP(Transmission Control Protocol): 연결형 서비스, 가상회선방식(3-way handshaking 신뢰성보장)
- UDP(User Datagram Protocol): 비연결형 서비스, 데이터그램방식
- SCTP(Stream Control Transmission Protocol): TCP, UDP 특성 결합

- 세그먼트 단위로 나누어졌다가 종단에서 합쳐진다

### 전송층에서의 전달

- 네트워크계층 host-to-host, 전송계층 port-to-port

![Alt text](images/image-12.png)

- 예시

- Transport layer: 포트, Network layer: IP, Data link layer: MAC

## 각 계층과 프로토콜의 비교

- physical, data-link, transport --> OS
- application, presentation, session --> APP

## 애플리케이션 프로토콜

## 정리

- 네트워크란 무엇인가?
  - 범위로 구분: LAN, WAN, INTERNET
- 통신을 위해서는 규약(protocol)이 필요하다
  - OSI 7 Layer, TCP/IP Stack
- 물리계층: 전기적 신호를 인코딩, 디코딩을 통해 컴퓨터에서 받아들인다
- 데이터링크: 물리주소(MAC), 노드 대 노드 책임, 프레임(단위)
- 네트워크계층: 논리(IP) 주소, 발신지-대-목적지 책임, 패킷(단위)
- 전송계층: 포트번호, 프로세스-대-프로세스 책임, 세그먼트(단위)
- 응용계층: 다양한 프로그램 및 프로토콜

## 네트워크 디바이스

- NIC(Network Interface Controller)
- bps: bit per second

## 이더넷 계층구조

- Data link layer
- LLC(Logical Link Control): 흐름제어와 오류제어
- MAC(Media Access Control): CSMA/CD 접근방법에 대한 동작

![Alt text](images/image-21.png)

## 이더넷 프레임(Frame) 포맷

![Alt text](images/image-23.png)

- 프레임의 길이

![Alt text](images/image-24.png)
![Alt text](images/image-25.png)

## 칩의 레지스터

- 레지스터: 칩의 공간. 제어 목적으로 저장 목적으로 나누어져있다.
- 기본 주소(base address)에 0x000A(ADD_PORT) 를 더해서 결정된다
