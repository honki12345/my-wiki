---
layout  : wiki
title   : http client
summary : 
date    : 2023-07-27 00:11:05 +0900
updated : 2023-07-27 00:11:05 +0900
tag     : week1 megaptera
toc     : true
public  : true
parent  : [[/megaptera/week1]]
latex   : false
resource: 9A960392-6C44-419B-9A6C-76C496121F21
---
* TOC
{:toc}

# 2. HTTP Client

### TCP/IP 통신

#### TCP/IP

- HTTP 통신은 TCP/IP를 통해 이루어진다
- TCP/IP는 TCP와 IP가 층을 이루는, 패킷 교환 네트워크 프로토콜의 집합이다

#### TCP 커넥션

- HTTP 메시지 전송을 위해서는 IP 주소와 포트번호를
이용해 클라이언트와 서버가 TCP/IP 커넥션을 맺어야한다
- HTTP 커넥션은 몇몇 사용규칙을 제외하고는 TCP 커넥션과 동일하다

#### 더 알아볼 것

- TCP 커넥션 순서와 wireshark로 확인하기

---

### TCP와 UDP

#### TCP

- TCP는 두 개의 호스트를 연결하고 데이터 스트림을 교환하게 해주는 전송제어
계층의 프로토콜이다
- TCP는 데이터와 패킷이 보내진 순서대로 전달되는걸 보장한다

#### UDP

- UDP는 핸드셰이크로 연결설정을 하지 않고 데이터가 제대로 도착했는지 확인하지
않으므로 보안 및 안정성이 좋지 않다
- UDP는 대신 위의 프로세스를 거치지 않으므로 속도가 빠르다
- UDP 패킷을 데이터그램이다고 한다

#### TCP와 UDP 비교

|항목|TCP|UDP|
|---|---|---|
|연결방식|연결기반(connection-oriented)</br>- 연결 후 통신(전화기)</br>- 1:1 통신방식|비연결기반(connectionless-oriented)</br>- 연결없이 통신(소포)</br>- 1:1, 1:n, n:n 통신방식|
|특징|데이터의 경계를 구분안함(byte-stream)</br>신뢰성 있는 데이터 전송</br>- 데이터의 전송순서가 보장됨</br>- 데이터의 수신여부를 확인함</br>(데이터가 손실되면 재전송)</br>- 패킷을 관리할 필요가 없음</br>UDP보다 전송속도가 느림|데이터의 경계를 구분함(datagram)</br>신뢰성 없는 데이터 전송</br>- 데이터의 전송순서가 바뀔 수 있음</br>- 데이터의 수신여부를 확인안함</br>(데이터가 손실되어도 알 수 없음)</br>- 패킷을 관리해주어야 함</br>TCP보다 전송속도가 빠름|
|관련 클래스|Socket</br>ServerSocket|DatagramSocket</br>DatagramPacket</br>MulticastSocket|

---

### Socket과 Socket API 구분

#### Socket

- 네트워크에서 이름 및 주소를 지정할 수 있는 통신연결점(endpoint)이다
- 소켓은 입력스트림, 출력스트림을 가지고 있다. 연결시 상대편 소켓의 스트림들과 교차연결된다

#### Socket API의 주요기능

- 연결 설정
- 데이터 주고 받기
- 연결 종료

---

### URI와 URL

#### 리소스

- 리소스는 텍스트, 이미지, 동영상 같이 웹에서 식별할 수 있는 모든 자원

#### URL(Uniform Resource Locator)

- 인터넷의 리소스를 가리키는 표준이름
- URL은 필요한 리소스의 위치, 접근방법을 알려준다
- URL은 URI의 부분집합
- URL은 `스킴://호스트(IP주소 또는 도메인이름)/경로` 구조로 이루어져있다

#### URI(Uniform Resource Identifier)

- URI은 두 부분집합 URL, URN을 가진다  
  URI: 리소스가 어디에 있는지 설명  
  URN: 이름만으로 식별

#### IP 주소

- IP 주소는 인터넷 프로토콜을 사용하는 네트워크에 연결된 모든 장치에 할당된 번호
- IPv4: 32비트(점(.)을 구분자로 0~255 사이의 숫자 4개로 구성)
- IPv6: 128비트(콜론(:)을 구분자로 4개의 16진수 8그룹으로 구성)

#### domain name

- 웹 서버에 대해 사람이 읽을 수 있는 주소를 제공
- IPv4 또는 IPv6은 사람이 기억하기 힘들다. 또한 변경될 수 있다 -> domain name

#### DNS(Domain Name System)

- DNS는 인터넷 전화번호부
- 도메인이름을 IP 주소로 변환하고 라우팅 정보를 제공하는 분산형 데이터베이스 시스템
- IP 주소 및 기타데이터를 저장하고 이름별로 쿼리할 수 있는 계층형 분산 데이터베이스

#### 포트(port)

- 포트는 호스트가 외부와 통신 하기위한 통로
- (네트워크)포트는 운영체제에서 관리
- 각 포트는 특정 프로세스 또는 서비스와 연결
- 0~65535의 범위를 가지며, 1023번 이하는 well-known

#### 경로(path)

- 서버 안의 리소스의 위치를 알려준다

#### 인터넷 프로토콜(Internet Protocol)

- 송신 호스트와 수신 호스트가 패킷 교환 네트워크에서 정보를 주고받는데 사용하는 프로토콜
- OSI 네트워크 계층에서 호스트 주소지정과 패킷 분할 및 조립 기능을 담당

#### 패킷 교환

- 작은 블록의 패킷으로 데이터를 전송한다
- 데이터를 전송하는 동안만 네트워크 자원을 사용
- 패킷은 여러 통신 지점들(node) 사이에서 개별적으로 경로가 제어된다

---

### Java text blocks

#### 생성

- text block으로 생성되는 객체는 java.lang.String이다

```java
// Error
String name = """red green blue""";

// Error
String name = """red
                 green
                 blue
                 """;

// Ok
String name = """
      red
      green
      blue""";

// Ok
String name = """
      red
      green
      red
      """;
```

- 큰따옴표를 이스케이프 처리할 필요가 없다

```java
String name = """
      String message = "Hello, world!";
      System.out.println(message);
      """;
```

#### 공백

- text block은 부수적인 공백(incidental white space)와 필수공백(essential space)를 구분한다  
  부수적인 공백 알고리즘은 JEP378에 자세히 설명되어있다  
  가장 적은 공백줄을 기준으로 공백을 제거한다

```java
void writeHTML() {
    String html = """
········<html>
········    <body>
········        <p>Hello World.</p>
········    </body>
········</html>
········""";
}
```

- 마지막 줄의 닫는 큰따옴표를 활용한 공백조절

```java
void writeHTML() {
    String html = """
········    <html>
········        <body>
········            <p>Hello World.</p>
········        </body>
········    </html>
········""";
}
```

- indent 메서드 활용한 공백조절

```java
String colors = """
    red
    green
    blue""".indent(4);
```

#### 후행공백(Trailing white space)

- text block에서 후행공백은 모두 제거된다.
- 후행공백을 활용하기 위한 세가지 전략은 다음과 같다

```java
// character substitution
String r = """
    trailing$$$
    white space
    """.replace('$', ' ');


// character fence
String s = """
    trailing   |
    white space|
    """.replace("|\n", "\n");


// octal escape sequence for space
String t = """
    trailing\040\040\040
    white space
    """;
```

#### style guide

- 단일 줄이라면 text block보다는 큰따옴표 2개를 활용한 문자열리터열이 낫다
- 여는 기호, 닫는 기호와 텍스트들이 왼쪽 여백을 맞추지마라.  
  변수 이름이나 지정자가 추가되면 텍스트 블록을 다시 들여써야한다

```java
// ORIGINAL
String string = """
                red
                green
                blue
                """;

// ORIGINAL - after variable declaration changes
static String rgbNames = """
                         red
                         green
                         blue
                         """;

// BETTER
String string = """
    red
    green
    blue
    """;

// BETTER - after variable declaration changes
static String rgbNames = """
    red
    green
    blue
    """;
```

- 닫는 기호를 개행하고 줄바꿈을 에스케이프로 개행방지 하는 것이 가독성에 낫다

```java
// ORIGINAL

String name = """
    red
    green
    blue""";


// BETTER

String name = """
        red
        green
        blue\
    """;
```

- String formatted(Object ... args)

```java
String output = """
    Name: %s
    Phone: %s
    Address: %s
    Salary: $%.2f
    """.formatted(name, phone, address, salary);
```

- String stripIndent(): text block과 동일한 알고리즘으로 여백제거

---

### Java InputStream과 OutputStream

#### 스트림

- a flow of data with a writer at one end and a reader at the other
- 데이터를 운반하는데 사용되는 연결통로
- 단방향 통신만 가능하다
- 연속적(sequence)으로 바이트 단위의 데이터를 주고 받는다  
  먼저 보낸 데이터를 먼저 받는다
- 데이터 입출력, 파일 읽고쓰기(FileInput/OutputStream), 네트워크통신 등에 사용

#### InputStream과 OutputStream

- 바이트기반의 스트림의 조상
- 추상클래스이다
- InputStream과 OutputStream을 상속하거나 래핑하여(보조스트림)
버퍼링, 필터링, 압축 또는 효율적인 데이터유형처리 같은 기능을 추가할 수 있다

#### java I/O 계층

- 바이트기반 스트림: Input/OutputStream(최상위), ByteArrayInput/OutputStream, FileInput/OutputStream  
  문자기반 스트림: Reader/Writer(최상위), FileReader/Writer, PipedReader/Writer, StringReader/Writer  
  바이트기반 보조스트림: FileInput/OutputStream, BufferedInput/OutputStream,
  DataInput/OutputStream, SequenceInputStream, PrintStream  
  문자기반 보조스트림: BufferedReader/Writer, InputStreamReader/Writer  

---

### Java try-with-resources

#### 정의

- try-with-resources 문이 끝날 때 선언된 하나 이상의 리소스(세미콜론(;)으로 구분)들을 닫는다
- java.io.Closeable을 구현하거나 java.lang.Autocloseable을 구현한 모든 객체를 리소스로 사용할 수 있다
- 기존의 try-catch-finally 구문에서는 리소스 구수의 위험이 있었다
- try-with-resources에서 catch블록, finally 블록은 리소스가 닫힌 후에 실행

#### Suppressed Exceptions

- try-with-resouces 문에서 여러 개의 예외가 발생할 시,
첫번째 예외는 정상적으로 처리되나 후속 예외는 억제된다(suppressed Exceptions)
- 첫번째 예외의 getSuppresedExceptions() 메서드를 호출하여 억제된 예외를 확인할 수 있다

```java
public class SuppressedExceptionExample {

  public static void main(String[] args) throws Exception {

    try ( Door door = new Door() ) {
      door.swing(); /* Throws the SwingException */
    }
    catch (Exception e) {
      System.out.println("Primary Exception:  " + e.getClass());
      if (e.getSuppressed().length>0) {
        System.out.print("Suppressed Exception: " + e.getSuppressed()[0]);
      }
    }
  }
}
```

