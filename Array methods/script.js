const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubtBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWorthBtn = document.getElementById('calculate-wealth');

let data = [];

// Fetch random user and add money

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 2000000)
  };
  addData(newUser);
}

// doubles everyones money

function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// sort users by money

function sortByMoney() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// add new obj to data array

function addData(obj) {
  data.push(obj);
  updateDOM();
}

// only show millionares

function showMillionares() {
  data = data.filter(data => data.money >= 1000000);
  updateDOM();
}

// calculate total money

function calcTotalMoney() {
  const money = data.reduce((acc, curr) => acc + curr.money, 0);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total wealth: <strong>${formatMoney(
    money
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// update dom

function updateDOM(providedData = data) {
  //clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(data => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${data.name}</strong> ${formatMoney(
      data.money
    )}`;
    main.appendChild(element);
  });
}

// format number as money

function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// event listeners

addUserBtn.addEventListener('click', getRandomUser);
doubtBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByMoney);
showMillionairesBtn.addEventListener('click', showMillionares);
calculateWorthBtn.addEventListener('click', calcTotalMoney);
