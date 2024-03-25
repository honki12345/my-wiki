class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super(`No property: ${property}`);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}

function test() {
  throw new ValidationError("에러 발생");
}

try {
  test();
} catch (err) {
  console.log(err.message);
  console.log(err.name);
  console.log(err.stack);
}

function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    // throw new ValidationError("No field: age");
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    // throw new ValidationError("No field: name");
    throw new PropertyRequiredError("name");
  }

  return user;
}

// try..catch와 readUser를 함께 사용한 예시
try {
  let user = readUser('{"age": 25}');
} catch (err) {
  if (err instanceof ValidationError) {
    console.log(`Invalid data: ${err.message}`);
    console.log(err.name);
    console.log(err.property);
  } else if (err instanceof SyntaxError) {
    console.log(`JSON Syntax Error: ${err.message}`);
  } else {
    throw err;
  }
}

class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
