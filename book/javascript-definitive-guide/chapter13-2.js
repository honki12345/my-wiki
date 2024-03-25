fetch("/api/user/profile") // HTTP 요청을 시작합니다
  .then((response) => {
    // 상태와 헤더를 받으면 호출합니다
    if (!respoonse.ok) {
      return null;
    } // 404 또는 비슷한 에러를 받았다면

    // 이제 헤더를 체크해 서버가 JSON을 보냈는지 확인합니다
    // 그렇지 않다면 서버에서 뭔가 잘못된 심각한 에러 상황입니다
    let type = response.headers.get("content-type");
    if (type !== "application/json") {
      throw new TypeError(`Expected JSON, get ${type}`);
    }

    // 여기 도달했다면 2xx 상태와 함께 JSON 콘텐츠 타입을 받은 것이니
    // 응답 바디를 JSON 객체로 파싱하는 프라미스를 반환해도 안전합니다
    return response.json();
  })
  .then((profile) => {
    // 분석된 응답 바디 또는 null로 호출됩니다
    if (profile) {
      displayUserProfile(profile);
    } else {
      // 위에서 404 에러를 받고 null을 반환했다면 여기가 끝입니다
      displayLoggedOutProfilePage();
    }
  })
  .catch((e) => {
    if (e instanceof NetwordError) {
      // 인터넷 연결이 끊겼다면 fetch()가 이런식으로 실패할 수 있습니다
      displayErrorMessage("Check your internet connection.");
    } else if (e instanceof TypeError {
        // 위에서 TypeError를 일으킨 경우입니다
        displayErrorMessage("Somthing is wrong with our server")
    } else {
        // 예상하지 못한 에러를 잡는 용도로만 사용합니다
        // 예상할 수 없는 에러를 이런식으로 처리해선 안됩니다
        console.error(e);
    }
  });
