"use strict";
const menu_burger = document.querySelector(".burger-icon");
const menu_header_mobile = document.querySelector(".menu-header-mobile");
const count_number = document.querySelector(".count-number");
count_number.value = 1;
const total_number = document.querySelector(".total-number");
const positive = document.querySelector(".positive");
const negetive = document.querySelector(".negetive");
const food_item1 = document.querySelector(".food-item1");
const food_item2 = document.querySelector(".food-item2");
const food_item3 = document.querySelector(".food-item3");
const food_item4 = document.querySelector(".food-item4");
const food_item5 = document.querySelector(".food-item5");
const item_food_burger = document.querySelector(".item-food1");
const item_food_combo = document.querySelector(".item-food2");
const item_food_chicken = document.querySelector(".item-food3");
const item_food_salad = document.querySelector(".item-food4");
const item_food_chickenburger = document.querySelector(".item-food5");
const item_food_drink = document.querySelector(".item-food6");

let price = 5.39;
menu_burger.addEventListener("click", function () {
  if (menu_burger.classList.contains("active")) {
    menu_burger.classList.toggle("active");
    menu_header_mobile.style.transform = "translateX(-500px)";
  } else {
    menu_burger.classList.toggle("active");
    menu_header_mobile.style.transform = "translateX(-8px)";
  }
});
count_number.addEventListener("input", function () {
  price = 5.39 * count_number.value;
  total_number.textContent = `$${price.toFixed(2)}`;
});
positive.addEventListener("click", function () {
  count_number.value = Number(count_number.value) + 1;
  price = 5.39 * count_number.value;
  total_number.textContent = `$${price.toFixed(2)}`;
});
negetive.addEventListener("click", function () {
  if (count_number.value > 0) {
    count_number.value = Number(count_number.value) - 1;
    price -= 5.39;
    total_number.textContent = `$${price.toFixed(2)}`;
  }
  if (count_number.value == 0) {
    total_number.textContent = 0;
  }
});
food_item1.style.backgroundColor = "#ffc300";
food_item1.addEventListener("click", function () {
  food_item1.style.backgroundColor = "#ffc300";
  food_item2.style.backgroundColor = "";
  food_item3.style.backgroundColor = "";
  food_item4.style.backgroundColor = "";
  food_item5.style.backgroundColor = "";
  item_food_burger.style.display = "block";
  item_food_combo.style.display = "block";
  item_food_chicken.style.display = "block";
  item_food_salad.style.display = "block";
  item_food_chickenburger.style.display = "block";
  item_food_drink.style.display = "block";
});
food_item2.addEventListener("click", function () {
  food_item1.style.backgroundColor = "";
  food_item2.style.backgroundColor = "#ffc300";
  food_item3.style.backgroundColor = "";
  food_item4.style.backgroundColor = "";
  food_item5.style.backgroundColor = "";
  item_food_burger.style.display = "block";
  item_food_combo.style.display = "none";
  item_food_chicken.style.display = "none";
  item_food_salad.style.display = "none";
  item_food_chickenburger.style.display = "block";
  item_food_drink.style.display = "none";
});
food_item3.addEventListener("click", function () {
  food_item1.style.backgroundColor = "";
  food_item2.style.backgroundColor = "";
  food_item3.style.backgroundColor = "#ffc300";
  food_item4.style.backgroundColor = "";
  food_item5.style.backgroundColor = "";
  item_food_burger.style.display = "none";
  item_food_combo.style.display = "none";
  item_food_chicken.style.display = "none";
  item_food_salad.style.display = "none";
  item_food_chickenburger.style.display = "none";
  item_food_drink.style.display = "block";
});
food_item4.addEventListener("click", function () {
  food_item1.style.backgroundColor = "";
  food_item2.style.backgroundColor = "";
  food_item3.style.backgroundColor = "";
  food_item4.style.backgroundColor = "#ffc300";
  food_item5.style.backgroundColor = "";
  item_food_burger.style.display = "none";
  item_food_combo.style.display = "none";
  item_food_chicken.style.display = "none";
  item_food_salad.style.display = "block";
  item_food_chickenburger.style.display = "none";
  item_food_drink.style.display = "none";
});
food_item5.addEventListener("click", function () {
  food_item1.style.backgroundColor = "";
  food_item2.style.backgroundColor = "";
  food_item3.style.backgroundColor = "";
  food_item4.style.backgroundColor = "";
  food_item5.style.backgroundColor = "#ffc300";
  item_food_burger.style.display = "none";
  item_food_combo.style.display = "block";
  item_food_chicken.style.display = "block";
  item_food_salad.style.display = "none";
  item_food_chickenburger.style.display = "none";
  item_food_drink.style.display = "none";
});
