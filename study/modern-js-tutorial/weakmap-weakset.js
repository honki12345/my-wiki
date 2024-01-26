let messages = [
  { text: "Hello", from: "John" },
  { text: "How goes?", from: "John" },
  { text: "See you soon", from: "Alice" },
];

const readMessages = new WeakSet();

// 메시지 두 개가 읽음 상태로 변경되었습니다
readMessages.add(messages[0]);
readMessages.add(messages[1]);
