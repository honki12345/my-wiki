# 컴퓨터네트워크-Ch02. 네트워크 계층별역할

## IP와 함께 사용되는 프로토콜

- IP는 다음 홉의 **MAC 주소**를 알아내기 위해 **ARP 프로토콜** 사용
- IP는 메시지를 제어하고 오류제어를 위해 **ICMP 프로토콜** 사용
- IP는 멀티캐스팅을 위해 **IGMP** 사용

## ARP가 사용되는 4가지 경우

![Alt text](images/image-27.png)

## ARP 맵핑 유형

- 동적 맵핑(Dynamic mapping)
  - 물리주소와 논리주소 쌍 중 하나만 알면 프로토콜을 이용하여 다른 하나를 알아낼 수 있다
  - ARP: 논리주소를 물리주소로 변환
  - RARP: 물리주소를 논리주소로 변환

## ARP 요청과 응답

![Alt text](images/image-28.png)

## ARP 패킷 형식

![Alt text](images/image-29.png)

## ICMP 개요

- IP 인터넷 프로토콜의 약점
  - IP는 오류보고와 오류정정메커니즘이 없음
  - IP는 호스트와 관리질의를 위한 메커니즘이 부족
- 이에 대한 해결책으로 ICMP 사용

## IPv6 개요

- IPv4의 문제점
  - IPv4 주소 공간 한계
  - IPv4 최소지연과 자원의 예약불가
  - IPv4 보안메커니즘(암호화와 인증)을 제공하지 않음

## IPv6 표현

- 128bits
- 16진수 4자리씩 표현법
  ![Alt text](images/image-30.png)
- 생략형(abbreviation)
  ![Alt text](images/image-31.png)

## IPv4 vs IPv6 체계

![Alt text](images/image-32.png)

## IPv6 이중스택(dual stack)

- IPv4와 IPv6 동시에 동작
  - 발신지 호스트는 어떤 버전을 사용할 것인가를 결정하기 위해 DNS에 질의
    ![Alt text](images/image-33.png)

## IPv6 - 터널링

- IPv6를 사용하는 두 컴퓨터가 통신할 때 중간노드가 IPv4를 사용할 경우
  - IPv6 패킷을 IPv4 패킷으로 캡슐화하여 전달한다.

![Alt text](images/image-34.png)
