import _ from 'lodash';
import './style.css';
import Dots from './images/dots.png';
import Enter from './images/enter.png';
import Refresh from './images/refresh.png';

//   // Lodash, now imported by this script
const refreshContainer = document.querySelector('.refresh-container');
const refresh = new Image();
refresh.src = Refresh;
refreshContainer.innerHTML = `<img src=${Refresh} class="refresh-icon" />`;

const enterContainer = document.querySelector('.enter-container');
const enter = new Image();
enter.src = Enter;
enterContainer.innerHTML = `<img src=${Enter} class="enter-icon" />`;

const listContainer = document.querySelector('.list-container');
const dots = new Image();
dots.src = Dots;

const tasks = [
  { index: 0, description: 'Wash the dishes', completed: true },
  { index: 1, description: 'Buy groceries', completed: true },
  { index: 2, description: 'Do the laundry', completed: false },
];

const createTask = (tasks) => {
  const taskContent = `
  <li class="element">
      <input type="checkbox" id="checkbox" class="checkbox" />
      <div>${tasks.description}</div>
      <div class="dots-container"><img class="dots"src=${Dots} /></div>
  </li>`;

  listContainer.innerHTML += taskContent;
};

const createList = (arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    createTask(arr[i]);
  }
};

createList(tasks);
