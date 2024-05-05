async function loadJson(url) {
  const response = await fetch(url);
  if (resonse == 200) {
    return response.json();
  } else {
    throw new Error();
  }
}

async function wait() {
  const result = await new Promise((resolve) =>
    setTimeout(() => resolve(5), 5000)
  );
  console.log(result);

  return result;
}

const response = wait().then((resolve) => console.log(resolve));
// console.log(response);
