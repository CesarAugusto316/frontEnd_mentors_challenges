"use strict";
const $bill = document.querySelector("#bill");
const people$Num = document.querySelector("#people-number");
const $percentages = document.querySelector(".percents");

const tip$Amount = document.querySelector(".output-1 > span");
const $total = document.querySelector(".output-2 > span");
const $reset = document.querySelector(".reset");

/** Default Values */
let perc = 0;
let bill = 0;
let subTotal = 0;
let peopleNumber = 1;

function percent(percent, bill) {
  return (parseInt(percent) * bill) / 100;
}

// TODO: $peopleNum add an eventHanlder on change of the input
// Some variables must be global in order to interact with
// different eventHanlder functions.
//* Percentage can be zero, because a tip is optional./

$percentages.addEventListener("click", function (e) {
  if (e.target.closest('input[type="button"]')) {
    perc = e.target.value || 0;
    bill = Number($bill.value) || 0;
    subTotal = percent(perc, bill) || 0;
    peopleNumber = Number(people$Num.value) || 1;

    //! ERROR !/
    if (bill === 0 || typeof bill != "number") {
      document.querySelector(".bill-input").classList.add("error");
      setTimeout(() => {
        document.querySelector(".bill-input").classList.remove("error");
      }, 4000);
      console.log("must enter an amount");
    } else {
      console.log(subTotal);
      $total.textContent = `$${((subTotal + bill) / peopleNumber).toFixed(2)}`;
      tip$Amount.textContent = `$${(subTotal / peopleNumber).toFixed(2)}`;
      document.querySelector("#custom").value = "";
    }
  } else if (e.target.closest('input[type="text"]')) {
    e.stopImmediatePropagation();
    return;
  }
});

document.querySelector(".inputs").addEventListener("input", function (e) {
  if (e.target.closest('input[type="text"]')) {
    if (e.target.id == "bill") {
      bill = Number(e.target.value) || 0;
    } else if (e.target.id == "custom") {
      perc = e.target.value || 0;
    } else if (e.target.id == "people-number") {
      peopleNumber = Number(e.target.value) || 1;
    }

    subTotal = percent(perc, bill) || 0;
    console.log(subTotal, bill, perc, peopleNumber);

    // //! ERROR !/
    if (bill === 0 || typeof bill != "number") {
      document.querySelector(".bill-input").classList.add("error");
      setTimeout(() => {
        document.querySelector(".bill-input").classList.remove("error");
      }, 4000);
      console.log("must enter an amount");
    } else {
      console.log(subTotal);
      $total.textContent = `$${((subTotal + bill) / peopleNumber).toFixed(2)}`;
      tip$Amount.textContent = `$${(subTotal / peopleNumber).toFixed(2)}`;
    }
  }
});

$reset.addEventListener("click", () => {
  $total.textContent = `$${(0).toFixed(2)}`;
  tip$Amount.textContent = `$${(0).toFixed(2)}`;
  bill = 0;
  peopleNumber = 1;
  perc = 0;
  subTotal = 0;
  //* This clears out the inputs leaving the placeholders visible */
  $bill.value = "";
  people$Num.value = "";
  document.querySelector("#custom").value = "";
});
