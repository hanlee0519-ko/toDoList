// 1. Add를 누르면, Item이 추가 된다.
// 2. Check 누르면, Item의 가운데 줄이 생긴다.
// 3. Delete 누르면, Item이 삭제된다.
// 4. Colum별로 Item이 다르게 보여준다.
// (1) all => 모든 Item을 다 보여준다.
// (2) done => checkValue == true Item만 보여준다.
// (3) Not Done => CheckValue == false Item만 보여준다.

let itemBox = [];
let filterBox = [];
let mode = 'all';

const columList = document.querySelectorAll('.colum__section span');
const inputBtn = document.querySelector(`.input__btn`);
const inputName = document.querySelector(`.input__name`);
const listArea = document.querySelector(`.list__area`);

console.log(columList);

columList.forEach((item) => {
  item.addEventListener('click', () => {
    if (item.innerText === 'All') {
      mode = 'all';
      console.log(itemBox);
      render();
    } else if (item.innerText === 'Not Done') {
      mode = 'ongoing';
      filterBox = itemBox.filter((item) => {
        return item.checkValue === false;
      });
      console.log('not Done', filterBox);
      render();
    } else if (item.innerText === 'Done') {
      mode = 'finish';
      filterBox = itemBox.filter((item) => {
        return item.checkValue === true;
      });
      console.log('done', filterBox);
      render();
    }
  });
});

inputBtn.addEventListener('click', () => {
  let name = inputName.value;
  if (name === '') {
    return;
  }
  itemBox.push({
    id: Math.random(),
    name: name,
    checkValue: false,
  });
  render();
});

const checkItem = (id) => {
  itemBox = itemBox.map((item) => {
    if (item.id === id) {
      let checkValue = item.checkValue;
      return { ...item, checkValue: !checkValue };
    }
    return item;
  });
  render();
};

const deleteItem = (id) => {
  itemBox = itemBox.filter((item) => {
    return id !== item.id;
  });
  render();
};

const render = () => {
  let renderBox = [];

  if (mode === 'all') {
    renderBox = itemBox;
  } else {
    renderBox = filterBox;
  }

  let resultHTML = '';
  resultHTML =
    resultHTML +
    renderBox
      .map((item) => {
        if (item.checkValue === true) {
          return `<li class="list__item">
            <span class="list__name list__check">${item.name}</span>
            <button class="list__btn--check" onclick="checkItem(${item.id})">Check</button>
            <button class="list__btn--delete" onclick="deleteItem(${item.id})">Delete</button>
          </li>`;
        } else {
          return `<li class="list__item">
            <span class="list__name">${item.name}</span>
            <button class="list__btn--check" onclick="checkItem(${item.id})">Check</button>
            <button class="list__btn--delete" onclick="deleteItem(${item.id})">Delete</button>
          </li>`;
        }
      })
      .join('');

  listArea.innerHTML = resultHTML;
};
