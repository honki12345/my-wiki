# interface

## 메인페이지

## signIn (로그인)

- request

```HTTP
  {
    *email: String,
    *password: String
  }
```

- response

  - 성공
    HTTPStatus - 200 (OK)

    ```HTTP
    {
      code: "SU",
      message: "success"
      token: "aaaa.bbbbb.ccccc",
      expireddate: 123456789
    }
    ```

  - 실패

    - 필수 정보 미입력

    - 로그인 실패
      HTTPStatus - 401 (Unauthorized)

      ```HTTP
        {
          code: "SF",
          message: "Sign In Failed."
        }
      ```

    - 데이터베이스 에러
      HTTPStatus - 500 (Internal Server Error)

      ```HTTP
        {
          code: "DE",
          message: "Database Error."
        }
      ```

## signUp (회원가입)

- request

  ```HTTP
    {
      *email: String,
      *password: String,
      *nickname: String,
      *telNumber: String,
      *address: String,
      addressDetail: String
    }
  ```

- response

  - 성공
    HTTPStatus - 201 (Created)

    ```HTTP
        {
          Code: "SU",
          message: "Success.",
        }
    ```

  - 실패

    - 필수 정보 미입력 / 이메일 포맷 불일치 / 비밀번호 8자 미만 / 전화번호 포맷 불일치

    - 이메일 중복
      HTTPStatus - 400 (Bad Request)

      ```HTTP
        {
          code: "EE",
          message: "Existed Email."
        }
      ```

    - 데이터베이스 에러
      HTTPStatus - 500 (Internal Server Error)

      ```HTTP
        {
          code: "DE",
          message: "Database Error."
        }
      ```

## weeklyTop3List (주간 상위 3 게시물 리스트)

- response

  - 성공
    HTTPStatus - 200 (OK)

  ```HTTP
  {
    code: "SU",
    message: "Success.",
    top3List: boardListItem[]
  }

  BoardListItem
  {
    boardNumber: int,
    title: String,
    content: String,
    boardTitleImage: String,
    favoriteCount: int,
    commentCount: int,
    viewCount: int,
    writeDateTime: String,
    writerNickname: String,
    writerProfileImage: String,

  }
  ```

  - 실패

    - 데이터베이스 에러
      HTTPStatus - 500 (Internal Server Error)

      ```HTTP
        {
          code: "DE",
          message: "Database Error."
        }
      ```

## currentList (최신 게시물 리스트)

- response

  - 성공
    HTTPStatus - 200 (OK)

  ```HTTP
  {
    code: "SU",
    message: "Success.",
    currentList: boardListItem[]
  }

  BoardListItem
  {
    boardNumber: int,
    title: String,
    content: String,
    boardTitleImage: String,
    favoriteCount: int,
    commentCount: int,
    viewCount: int,
    writeDateTime: String,
    writerNickname: String,
    writerProfileImage: String,

  }
  ```

  - 실패

    - 데이터베이스 에러
      HTTPStatus - 500 (Internal Server Error)

      ```HTTP
        {
          code: "DE",
          message: "Database Error."
        }
      ```

## popularWordList (인기 검색어 리스트)

- response

  - 성공
    HTTPStatus - 200 (OK)

  ```HTTP
  {
    code: "SU",
    message: "Success.",
    popularWordList: String[]
  }
  ```

  - 실패

  - 데이터베이스 에러
    HTTPStatus - 500 (Internal Server Error)

    ```HTTP
      {
        code: "DE",
        message: "Database Error."
      }
    ```

## searchList (검색 게시물 리스트)

- response

  - 성공
    HTTPStatus - 200 (OK)

  ```HTTP
  {
    code: "SU",
    message: "Success.",
    searchList: boardListItem[]
  }

  BoardListItem
  {
    boardNumber: int,
    title: String,
    content: String,
    boardTitleImage: String,
    favoriteCount: int,
    commentCount: int,
    viewCount: int,
    writeDateTime: String,
    writerNickname: String,
    writerProfileImage: String,

  }
  ```

  - 실패

    - 데이터베이스 에러
      HTTPStatus - 500 (Internal Server Error)

      ```HTTP
        {
          code: "DE",
          message: "Database Error."
        }
      ```

## relativeWordList (관련 검색어 리스트)

- response

  - 성공
    HTTPStatus - 200 (OK)

  ```HTTP
  {
    code: "SU",
    message: "Success.",
    relativeWordList: boardListItem[]
  }
  ```

  - 실패

    - 데이터베이스 에러
      HTTPStatus - 500 (Internal Server Error)

      ```HTTP
        {
          code: "DE",
          message: "Database Error."
        }
      ```

## 게시물 상세페이지

- boardDetail (게시물 상세)
- favoriteList (좋아요 리스트 불러오기)
- putFavorite (좋아요 기능)
- commentList (댓글 리스트)
- postComment(댓글 쓰기)
- boardDelete (게시물 삭제)
- boardWrite (게시물 쓰기)
- boardUpdate (게시물 수정)

## 마이페이지

- getUser (유저 정보)

## userBoardList (특정 유저 게시물 리스트)

- fileUpload (파일 업로드)
- getFile (파일 불러오기)
