function getCurrentVersionNumber(versionCallback) {
  // 콜백을 인자로 받습니다
  // 백엔드의 버전 API에 HTTP 요청을 보냅니다
  let request = new XMLHttpRequest();
  request.open("GET", "http://www.example.com/api/version");
  request.send();

  //   응답을 받았을 때 호출한 콜백을 등록합니다
  request.onload = function () {
    if (request.status === 200) {
      // HTTP 상태가 OK면 버전 번호를 가져와서 콜백을 호출합니다
      let currentVersion = parseFloat(request.responseText);
      versionCallback(null, currentVersion);
    } else {
      // 그렇지 않다면 콜백에 에러를 보고합니다
      versionCallback(response.statusTest, null);
    }
  };
  // 네트워크 에러가 생겼을 때 호출할 다른 콜백을 등록합니다
  request.onerror = request.ontimeout = function (e) {
    versionCallback(e.type, null);
  };
}

const https = require("https");

// URL의 텍스트 콘텐츠를 읽고 비동기적으로 콜백에 전달합니다
function getText(url, callback) {
  // URL에 HTTP GET 요청을 시작합니다
  request = https.get(url);

  //   응답 이벤트를 처리할 함수를 등록합니다
  request.on("response", (response) => {
    // 응답 이벤트가 있다는 것은 응답 헤더를 받았다는 의미입니다
    let httpStatus = response.statusCode;

    // HTTP 응답의 바디는 아직 받지 못했으므로
    // 바디를 받았을 때 호출할 이벤트 핸들러를 등록합니다
    response.setEncoding("utf-8"); // 유니코드 텍스트를 예상합니다
    let body = ""; // 텍스트는 이 변수에 누적됩니다

    // 바디의 텍스트 덩어리를 사용할 수 있게 되면 이 이벤트 핸들러를 호출합니다
    response.on("data", (chunk) => {
      body += chunk;
    });

    // 응답이 완료되면 이 이벤트 핸들러를 호출합니다
    response.on("end", () => {
      if (httpStatus === 200) {
        // HTTP 응답이 OK라면
        callback(null, body);
      } else {
        callback(httpStatus, null);
      }
    });
  });

  // 저수준 네트워크 에러를 처리할 이벤트 핸들러도 등록합니다
  request.on("error", (err) => {
    callback(err, null);
  });
}
