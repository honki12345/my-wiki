# 8강 네트워크 - go-back-n, 슬라이딩 윈도우, 흐름제어

- https://www.youtube.com/watch?v=WXixrx8wCKU

# 링크계층

- 데이터링크(2계층) 제어에서 전달하는 데이터의 단위를 프레임(frame)이라고 부른다

![image-20230808110539845](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230808110539845.png)

- Physical layer: 매체에 따라 이진수를 어떤 전기적 신호로 바꿀 것 인가?

#### 프레임의 경계 구별

![image-20230808112047695](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230808112047695.png)

- 프레임 구분: 문자(character)이냐 비트

#### Byte stuffing

- 만약 프레임 내에 `flag byte`와 동일한 `byte`의 데이터가 있다면?
    프레임의 경계인지 데이터인지 구분할 필요가 있다
    --> 앞에 `ESC`를 붙인다.
    sender: stuffed (esc 추가)
    receiver: unstuffed (esc 제거)

![image-20230808112328222](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230808112328222.png)

#### Byte stuffing

- 만약 프레임 내에 `flag bit` 패턴과 동일한 비트패턴의 데이터가 존재한다면?

#### 흐름제어(flow control)

- 흐름제어는 **수신 장치**가 (송신 장치가 보내는 데이터의 양)을 조절하도록 하는 절차
- 흐름제어의 방법
    - Stop-and-wait flow control
    - Sliding window flow control

#### Stop-and-Wait Flow control

- 송신 장치는 보낸 프레임에 대한 ACK이 오기전까지 송신을 중단하고, ACK이 도착하면 다음 프레임을 전송한다

![image-20230808112835374](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230808112835374.png)

###### 만약 프레임이 손실되었다면

- Ack: 다음 수신할 패킷 (sequence) 번호

![image-20230808112905540](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230808112905540.png)

- 패킷 보내고 타이머를 킨다 - Time-out 발동시 재발송

#### Sliding window flow control

- 송신 장치는 ACKf 를 받지 않더라도 계속해서 윈도우 사이즈까지 프레임을 전송한다
- 연속해서 보낼 수 있는 가능한 프레임의 수를 계속 모니터링 한다
- 송신 장치의 window
    - 현재 순간에 ACK를 받지 않더라도 보낼 수 있는 프레임의 수
    - 현재 수신 장치의 buffer에 비어있는 공간의 크기

 ![image-20230808114442935](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230808114442935.png)

###### 예: 최대 윈도우크기 = 7

![image-20230808115249688](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230808115249688.png)

- Sf는 Ack받으면 이동한다. Sf가 이동하면 전체 윈도우크기(회색)이 이동한다

###### 예:재전송발생

![image-20230808115414878](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230808115414878.png)

- timer는 각 프레임마다 있다 - ack 도착시 사라진다
    1번이 안오면 2,3 번이 와도 채우지 않는다 (버린다)
    1번 안오면 fn(보낸 프레임) 까지 전부 재전송

#### 에러제어

- 에러제어
    - 에러검출
        - CRC
        - Checksum
    - 에러정정
        - Forward error correction
        - 재전송 (retransmission, ARQ)
            - Stop-and-Wait ARQ
            - Go-Back-N ARQ
            - Selective Repeat ARQ

#### Go-Back-N(숫자) ARQ

- N(숫자)로 돌아간다
- 

![image-20230808115908761](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230808115908761.png)

- NAK(4) -> 3번까지는 잘 받고 4번부터 오류 ( 받은 5,6은 버린다)
    - Go-Back-N(4) - 4번으로 돌아간다	 
- 그 외의 ACK(8) 부분은 문제가있다

#### Selective Repeat ARQ

![image-20230808120506658](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230808120506658.png)

- Selective Repeat는 Go-Back과 달리 Frame 1이 문제 있어도 Frame 2, 3 을 채운다





#### 최대 window size (Go-Back-N)

- 최대 window size는 재전송이 발생했을 때 문제가 없도록 한다
    - Receiver의 Ack 전송이 실패하면 어떻게 될까? - Sender는 다시 재전송하지만 Receiver는 받은 것 뒤에부터 채운다

![image-20230808121055838](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230808121055838.png)

 

![image-20230808121128459](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230808121128459.png)