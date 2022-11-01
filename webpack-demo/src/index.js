import _ from 'lodash';
import './style.css';

//   // Lodash, now imported by this script

const listContainer = document.querySelector('.list-container');
const tasks = [
  { index: 0, description: 'Wash the dishes', completed: true },
  { index: 1, description: 'Buy groceries', completed: true },
  { index: 2, description: 'Do the laundry', completed: false },
];

const createTask = (tasks) => {
  const taskContent = `<div class="task">Hello ${tasks.description}</div>`;

  listContainer.innerHTML += taskContent;
};

const createList = (arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    createTask(arr[i]);
  }
};

createList(tasks);
