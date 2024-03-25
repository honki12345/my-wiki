async function loadJson(url) {
  const response = await fetch(url);
  if (resonse == 200) {
    return response.json();
  } else {
    throw new Error();
  }
}

async function wait() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return 10;
}

const response = wait().then((resolve) => console.log(resolve));
// console.log(response);
