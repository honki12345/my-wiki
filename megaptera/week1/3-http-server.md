---
layout  : wiki
title   : http server
summary : 
date    : 2023-07-27 00:12:02 +0900
updated : 2023-07-27 00:12:02 +0900
tag     : megaptera week1
toc     : true
public  : true
parent  : [[/megaptera/week1]]
latex   : false
resource: 9574CE82-3443-4DD0-B72B-8F811C418C7A
---
* TOC
{:toc}

# 3. HTTP Server

### Java ServerSocket

#### Client & Server

- 클라이언트는 언제든지 소켓을 생성하여 서버와 대화를 시작할 수 있지만, 서버는 들어오는 대화요청을 수신하기 위해 미리 준비되어 있어야한다.
- java.net.Socket 클래스는 클라이언트와 서버 모두에서의 개별 소켓이다

#### ServerSocket

- 하나의 포트에 한 ServerSocket만 연결가능

`Socket socket = serverSocket.accept();`

- accpet()는 요청이 도착할 때까지 진행을 멈추고(blocked) 기다린다
- 클라이언트가 연결을 시도하면 accept() 메서드는 클라이언트와 통신하는데 사용되는 새 Socket 객체를 만든다. 그리고 클라이언트에 대한 정보를 새 Socket에 전달
- 다시 ServerSocket은 수신대기작업을 기다린다

---

### Blocking vs Non-Blocking

#### block I/O

- blocking I/O 작업을 요청한 프로세스/쓰레드는 요청이 완료될때까지 블락된다
- Socket read() 호출 시 socket의 recv_buffer에 데이터가 들어올때까지 block된다
- Socket write() 호출 시 send_buffer가 가득차있다면 공간이 빌 때까지 block된다

#### non-block I/O

- 프로세스/쓰레드를 block 시키지 않고 요청에 대한 현재상태를 **즉시 리턴**

