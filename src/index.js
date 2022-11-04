import './style.css';
import Dots from './images/dots.png';
import Enter from './images/enter.png';
import Refresh from './images/refresh.png';
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
const listContainer = document.querySelector('.list-container');
const dots = new Image();
dots.src = Dots;

// task Class: represents a task object
class Task {
  constructor(id, description, completed) {
    this.id = id;
    this.description = description;
    this.completed = false;
  }
}
// Store Class: Handles Storage
class Store {
  // Counter to keep track of task index
  constructor() {
    this.count = this.getList().length;
  }

  // Call to books from storage with get item
  getList() {
    if (localStorage.getItem('list') === null) {
      this.list = [];
    } else {
      this.list = JSON.parse(localStorage.getItem('list'));
    }
    return this.list;
  }

  addTask(task) {
    const newTask = {
      id: this.count,
      description: task.description,
      completed: false,
    };

    const list = this.getList();
    list.push(newTask);
    localStorage.setItem('list', JSON.stringify(list));
    this.count += 1;
  }
}

// Creating new Store instance
const store = new Store();

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
        <div><input value="${task.description}" class="task-input"/></div>
        <div class="dots-container"><img class="dots"src="${Dots}" /></div>
    `;
    tasksList.appendChild(taskContent);
    taskContent.classList.add('element');
    taskContent.setAttribute('id', `task-${task.id}`);
  }

  static deleteCompleted() {
    const liList = document.querySelectorAll('.element');
    liList.forEach((li) => {
      const checkbox = li.querySelector('.checkbox');
      console.log(checkbox.checked);
      if (checkbox.checked) {
        li.remove();
        const list = localStorage.getItem('list');
        const parsedlist = JSON.parse(list);
        console.log(typeof parsedlist, parsedlist);
        //
        const filteredList = parsedlist.filter((task) => {
          const fullid = li.id;

          const idString = fullid.split('-')[1];
          const id = parseInt(idString);
          console.log(typeof id);
          return task.id !== id;
        });
        console.log(filteredList);
        localStorage.setItem('list', JSON.stringify(filteredList));
      }
    });
    console.log(liList);
  }

  static clearFields() {
    document.querySelector('#list-item').value = '';
  }
}

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

// Event listener for removing a book
