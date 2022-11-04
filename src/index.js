/* eslint-disable max-classes-per-file */
import './style.css';
// import { update } from 'lodash';
import Dots from './images/dots.png';
import Enter from './images/enter.png';
import Refresh from './images/refresh.png';
import Store from './StoreClass.js';
// import { functionsIn, update } from 'lodash';

// Get Image for refresh icon
const refreshContainer = document.querySelector('.refresh-container');
const refresh = new Image();
refresh.src = Refresh;
refreshContainer.innerHTML = `<img src=${Refresh} class="refresh-icon" />`;

// Get image for enter icon
const enterContainer = document.querySelector('.enter-container');
const enter = new Image();
enter.src = Enter;
enterContainer.innerHTML = `<img src=${Enter} class="enter-icon" />`;

// Get image for 3 dots
// const listContainer = document.querySelector('.list-container');
const dots = new Image();
dots.src = Dots;

// task Class: represents a task object
class Task {
  constructor(id, description, completed) {
    this.id = id;
    this.description = description;
    this.completed = completed;
  }
}
// Store Class: Handles Storage

// Creating new Store instance
const store = new Store();

// Update Task
function updateTask(e) {
  const text = e.target.value;
  const value = e.target.id;
  const splitid = value.split('-');
  const idstring = splitid[2];
  const id = parseInt(idstring, 10);
  const list = store.getList();
  for (let i = 0; i < list.length; i += 1) {
    const task = list[i];
    if (task.id === id) {
      list[i].description = text;
    }
  }
  localStorage.setItem('list', JSON.stringify(list));
}

const inputTasks = [];
// UI Class : Handles UI tasks
class UI {
  // Static so I don't have to instantiate

  static displayList() {
    const list = store.getList();
    list.forEach((task) => UI.addTodoList(task));
  }

  static addTodoList(task) {
    const tasksList = document.getElementById('list-container');

    const taskContent = document.createElement('li');
    taskContent.innerHTML = `
        <input type="checkbox" id="checkbox" class="checkbox" />
        <div><input value="${task.description}" class="task-input" id="task-input-${task.id}"/></div>
        <div class="dots-container"><img class="dots"src="${Dots}" /></div>
    `;
    tasksList.appendChild(taskContent);
    const taskInput = taskContent.querySelector('.task-input');
    taskInput.addEventListener('keyup', updateTask);
    inputTasks.push(taskInput);
    taskContent.classList.add('element');
    taskContent.setAttribute('id', `task-${task.id}`);
  }

  static deleteCompleted() {
    const liList = document.querySelectorAll('.element');
    liList.forEach((li) => {
      const checkbox = li.querySelector('.checkbox');
      if (checkbox.checked) {
        li.remove();
        const list = localStorage.getItem('list');
        const parsedlist = JSON.parse(list);
        //
        const filteredList = parsedlist.filter((task) => {
          const fullid = li.id;

          const idString = fullid.split('-')[1];
          const id = parseInt(idString, 10);
          return task.id !== id;
        });
        localStorage.setItem('list', JSON.stringify(filteredList));
        store.resetIds();
      }
    });
  }

  static clearFields() {
    document.querySelector('#list-item').value = '';
  }
}

// Update Task

// Event listener for UI when load
document.addEventListener('DOMContentLoaded', UI.displayList);

const btnClear = document.querySelector('#btn-clear');
btnClear.addEventListener('click', UI.deleteCompleted);

// Event listener for submit
document.querySelector('#new-todo-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const id = store.count;
  const description = document.querySelector('#list-item').value;
  const completed = false;

  // New task instance when you submit
  const task = new Task(id, description, completed);

  // Sending task object submision to UI and storage
  UI.addTodoList(task);

  store.addTask(task);

  UI.clearFields();
});
