"use strict";
const container2 = document.querySelector(".container2");
const container3 = document.querySelector(".container3");
const text_log = document.querySelector("header p");
const user_input = document.querySelector(".input-header1");
const pin_input = document.querySelector(".input-header2");
const button_header = document.querySelector(".button-header");
const item1_number = document.querySelector(".item1-number");
const item1_number_positive = document.querySelector(".item1-number-positive");
const item1_number_negative = document.querySelector(".item1-number-negative");
const item1_date = document.querySelector(".item1-date");
const item1_money = document.querySelector(".item1-money");
const total_money = document.querySelector(".header-main-text-right");
const a = document.querySelector(".item1");
const date_header = document.querySelector(".header-main-text-left-2");
const input_user_transfer = document.querySelector(
  "input.item2-input[type='text']",
);
const input_number_transfer = document.querySelector(
  'input.item2-input[type="number"]',
);
const button_item2 = document.querySelector(".item2-button");
const input_loan = document.querySelector('input.item3-input[type="number"]');
const button_loan = document.querySelector(".item3-button");
const input_close_user = document.querySelector(".item4-input1");
const input_close_pin = document.querySelector(".item4-input2");
const button_close = document.querySelector(".item4-button");
const footer_in = document.querySelector(".footer-in-money");
const footer_out = document.querySelector(".footer-out-money");
const footer_interest = document.querySelector(".footer-interest-money");
const time_footer_log = document.querySelector(".time");
const sort_footer = document.querySelector(".footer-sort");
///////////////////////////////////////////
let test;
a.textContent = "";
const Users = {
  shima_golabnia: {
    name: "shima",
    user: "sh",
    pin: 7777,
    money: [1000, -2000, -2500, 6800, 1700],
    locale: "en-US",
    currency: "USD",
    Inventory: function () {
      let totaly = 0;
      for (const i of this.money) {
        totaly += i;
      }
      return totaly;
    },
  },
  meraj_chaman: {
    name: "meraj",
    user: "me",
    pin: 1010,
    money: [8000, -1000, -2000, 2670, 12700],
    locale: "en-US",
    currency: "USD",
    Inventory: function () {
      let totaly = 0;
      for (const i of this.money) {
        totaly += i;
      }
      return totaly;
    },
  },
  parsa_eghbaly: {
    name: "parsa",
    user: "pa",
    pin: 4444,
    money: [87000, 20300, -32500, -38900, -17000],
    locale: "en-US",
    currency: "USD",
    Inventory: function () {
      let totaly = 0;
      for (const i of this.money) {
        totaly += i;
      }
      return totaly;
    },
  },
};
console.log(Math.max(...Users.parsa_eghbaly.money));
console.log(1000 / 10);
let currentUser = null;
///////////////////////////////////////////////
button_header.addEventListener("click", function () {
  const now = new Date();
  console.log(now.toLocaleDateString(local, option));
  a.textContent = "";
  Object.keys(Users).find(function (mov, i) {
    if (
      Users[mov].user === user_input.value &&
      Users[mov].pin === Number(pin_input.value)
    ) {
      test = true;
      time(true);
      container2.style.visibility = "visible";
      container3.style.visibility = "visible";
      container2.style.opacity = "100";
      container3.style.opacity = "100";
      currentUser = mov;
      date_header.textContent = `As of ${now.toLocaleDateString(local, option)}`;
      Transaction(mov);
      return (text_log.textContent = `welcome back, ${Users[mov].name}`);
    } else if (
      (i == Object.keys(Users).length - 1 &&
        Users[mov].user !== user_input.value) ||
      Number(Users[mov].pin) != Number(pin_input.value)
    ) {
      text_log.textContent = `wrong your user or pin`;
    }
  });

  if (!user_input.value && !Number(pin_input.value)) {
    text_log.textContent = "Log in to get started";
  } else if (user_input.value && !Number(pin_input.value)) {
    text_log.textContent = "Enter your, pin";
  } else if (!user_input.value && Number(pin_input.value)) {
    text_log.textContent = "Enter your, user";
  }
  user_input.value = "";
  pin_input.value = "";
  return 0;
});
////////////////////transfer/////////////////////
button_item2.addEventListener("click", function () {
  if (!currentUser) return;
  Object.keys(Users).find(function (keys) {
    if (
      Users[keys].user === input_user_transfer.value &&
      Users[keys].user !== Users[currentUser].user &&
      0 < Number(input_number_transfer.value) &&
      Number(input_number_transfer.value) <=
        Number(Users[currentUser].Inventory())
    ) {
      Users[currentUser].money.push(Number(-input_number_transfer.value));
      Users[keys].money.push(Number(input_number_transfer.value));
      Transaction(currentUser);
    }
  });
  input_user_transfer.value = "";
  input_number_transfer.value = "";
  return 0;
});
///////////////////creat-list-transaction//////////////////////
const Transaction = function (mov) {
  let sumin = 0;
  let sumout = 0;
  let interest = 0;
  a.textContent = "";
  total_money.textContent = formatCurrency(
    Users[currentUser].Inventory(),
    Users[currentUser],
  );
  for (const [i, item] of Object.entries(Users[mov].money)) {
    const div_item1 = document.querySelector(".item1");
    const div_item12 = document.createElement("div.item12");
    const div_item1_number = document.createElement("div.item1-number");
    const div_item1_date = document.createElement("div.item1-date");
    const div_item1_money = document.createElement("div.item1-money");
    div_item12.classList.add("item12");
    div_item1_number.classList.add("item1-number");
    div_item1_date.classList.add("item1-date");
    div_item1_money.classList.add("item1-money");
    div_item12.appendChild(div_item1_number);
    div_item12.appendChild(div_item1_date);
    div_item12.appendChild(div_item1_money);
    div_item1.prepend(div_item12);
    if (item < 0) {
      div_item1_number.textContent = `${Number(i) + 1} withdrawal`;
      div_item1_date.textContent = "today";
      div_item1_money.textContent = formatCurrency(item, Users[currentUser]);
      div_item1_number.classList.remove("item1-number-positive");
      div_item1_number.classList.add("item1-number-negative");
      sumout += item;
      footer_out.textContent = -sumout;
    } else {
      div_item1_number.textContent = `${Number(i) + 1} desposit`;
      div_item1_date.textContent = "today";
      div_item1_money.textContent = formatCurrency(item, Users[currentUser]);
      div_item1_number.classList.add("item1-number-positive");
      div_item1_number.classList.remove("item1-number-negative");
      sumin += item;
      footer_in.textContent = sumin;
      interest += item / 100;
      footer_interest.textContent = interest;
    }
  }
};

////////////////loan///////////////
button_loan.addEventListener("click", function () {
  if (!currentUser) return;
  if (
    Math.max(...Users[currentUser].money) >= Number(input_loan.value) / 10 &&
    Number(input_loan.value) > 0
  ) {
    Users[currentUser].money.push(Number(input_loan.value));
    Transaction(currentUser);
  }
  input_loan.value = "";
});

//////////////close////////////
button_close.addEventListener("click", function () {
  if (!currentUser) return;
  if (
    input_close_user.value === Users[currentUser].user &&
    Number(input_close_pin.value) === Users[currentUser].pin
  ) {
    delete Users[currentUser];
    text_log.textContent = "Log in to get started";
    container2.style.visibility = "hidden";
    container3.style.visibility = "hidden";
    container2.style.opacity = "0";
    container3.style.opacity = "0";
  }
  input_close_user.value = "";
  input_close_pin.value = "";
  return true;
});
//////////////time/////////////
let time_log = 120;
let timer;
const time = function (x) {
  clearInterval(timer);
  time_log = 120;
  time_footer_log.textContent = `You will be logged out in 02:00`;
  timer = setInterval(function () {
    const min = String(Math.trunc(time_log / 60)).padStart(2, "0");
    const sec = String(time_log % 60).padStart(2, "0");
    time_footer_log.textContent = `You will be logged out in ${min}:${sec}`;
    if (x) {
      time_log--;
    }

    if (time_log < 0) {
      clearInterval(time);
      text_log.textContent = "Log in to get started";
      container2.style.visibility = "hidden";
      container3.style.visibility = "hidden";
      container2.style.opacity = "0";
      container3.style.opacity = "0";
      input_close_user.value = "";
      input_close_pin.value = "";
      input_loan.value = "";
      input_number_transfer.value = "";
      input_user_transfer.value = "";
      currentUser = null;
    }
  }, 1000);
};
//////////////date/////////////
const option = {
  hour: "numeric",
  minute: "numeric",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};
const local = navigator.language;
/////////////sort/////////////////

sort_footer.addEventListener("click", function () {
  if (!currentUser) return;
  if (currentUser && test) {
    a.textContent = "";
    sort(currentUser);
    return (test = false);
  }
  if (currentUser && !test) {
    Transaction(currentUser);
    return (test = true);
  }
});
const sort = function (mov) {
  let temp;

  let op = [...Users[mov].money];
  for (let i = 0; i < op.length; i++) {
    for (let j = 0; j < op.length; j++) {
      if (op[i] < op[j]) {
        temp = op[i];
        op[i] = op[j];
        op[j] = temp;
      }
    }
  }
  for (const [i, item] of op.entries()) {
    const div_item1 = document.querySelector(".item1");
    const div_item12 = document.createElement("div.item12");
    const div_item1_number = document.createElement("div.item1-number");
    const div_item1_date = document.createElement("div.item1-date");
    const div_item1_money = document.createElement("div.item1-money");
    div_item12.classList.add("item12");
    div_item1_number.classList.add("item1-number");
    div_item1_date.classList.add("item1-date");
    div_item1_money.classList.add("item1-money");
    div_item12.appendChild(div_item1_number);
    div_item12.appendChild(div_item1_date);
    div_item12.appendChild(div_item1_money);
    div_item1.prepend(div_item12);
    if (item < 0) {
      div_item1_number.textContent = `${Number(i) + 1} withdrawal`;
      div_item1_date.textContent = "today";
      div_item1_money.textContent = formatCurrency(item, Users[currentUser]);
      div_item1_number.classList.remove("item1-number-positive");
      div_item1_number.classList.add("item1-number-negative");
    } else {
      div_item1_number.textContent = `${Number(i) + 1} desposit`;
      div_item1_date.textContent = "today";
      div_item1_money.textContent = formatCurrency(item, Users[currentUser]);
      div_item1_number.classList.add("item1-number-positive");
      div_item1_number.classList.remove("item1-number-negative");
    }
  }
  op = [];
};
/////////////////////////////////////////////
const formatCurrency = function (value, user) {
  return new Intl.NumberFormat(user.locale, {
    style: "currency",
    currency: user.currency,
  }).format(value);
};
/////////////////////////////////
