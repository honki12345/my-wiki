# 자바 웹 개발 워크북 - jwt

### Access Token / Refresh Token 의 의미

#### Access Token

- 입장권에 해당하는 토큰(token)을 API 서버에서는 'Access Token' 이라고 한다
- 특정한 자원에 접근할 권한이 있는지를 검사하기 위한 용도
- Access Token 을 탈취 당한다면 문제가 발생하므로 최대한 유효 시간을 짧게 지정하고 사용자에게는 Refresh Token 이란걸 같이 생성해 주어 필요할 시 다시 Access Token 을 발급 받을 수 있도록 한다
    - Access Token 을 작성할 때는 기본적으로 암호화나 인코딩 처리가 필요

![image-20230809203506755](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230809203506755.png)

#### 만료되는 상황

![image-20230809203611505](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230809203611505.png)

![image-20230809203704427](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230809203704427.png)

#### 예제 프로젝트 구현내용

- Access Token  과 Refresh Token 의 생성처리
- Access Token 이 만료되었을 때의 처리
    - Refresh Token 의 검사와 만료가 얼마 남지 않은 Refresh Token의 갱신
        새로운 Access Token 의 생성

