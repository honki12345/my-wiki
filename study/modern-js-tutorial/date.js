let date = new Date("2024-01-30");
// console.log(date);

date = new Date(2012, 1, 20, 3, 12);
console.log(date);

/* const getWeekDay = (date) => {
  const day = date.getDay();
  switch (day) {
    case 0:
      return "SU";
    case 1:
      return "MO";
    case 2:
      return "TU";
    case 3:
      return "WE";
    case 4:
      return "TH";
    case 5:
      return "FR";
    case 6:
      return "SA";
  }
}; */

function getWeekDay(date) {
  let days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  return days[date.getDay()];
}

/*  Sunday - Saturday : 0 - 6
    su(0) mo(1) tu(2) we(3) th(4) fr(5) sa(6)
    su(7) mo(1) tu(2) we(3) th(4) fr(5) sa(6)
    Monday - Sunday : 1 - 7*/
function getLocalDay(date) {}

function getDateAgo(date, days) {
  const tmp = new Date(date);
  tmp.setDate(tmp.getDate() - days);
  return tmp.getDate();
}

date = new Date(2015, 0, 2); // 2015년 1월 2일

console.log(getDateAgo(date, 1)); // 1, (2015년 1월 1일)
console.log(getDateAgo(date, 2)); // 31, (2014년 12월 31일)
console.log(getDateAgo(date, 365)); // 2, (2014년 1월 2일)
