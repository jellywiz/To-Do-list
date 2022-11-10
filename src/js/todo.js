/* eslint-disable import/no-unresolved */
/* eslint-dsibale no-loop-func, no-func-assign, no-class-assign */
import deleteItem from './deletetodo.js';
import addAnItem from './addtodos.js';
import updateTodo from './updatetodos.js';
import checkTodo from './checktodos.js';
import clearAllBtn from './clearallbtn.js';

// Getting the selectors from the DOM
const addText = document.querySelector('.input-text');
const todoDiv = document.querySelector('.lists');
const removeBtn = document.querySelector('.remove-btn');
// Creating the array of objects to store the todos and retrive data from local storage
let activities = localStorage.getItem('todo') !== null ? JSON.parse(localStorage.getItem('todo')) : [];
// Calculating the lengths of the todos
let index = activities.length;

// Constatntly updaing the UI and render dynamicly.
const render = () => {
  if (activities !== null) {
    todoDiv.innerHTML = '';
    activities.forEach((activitie) => {
      const activitieCheck = activitie.completed === true ? 'checked' : '';
      todoDiv.innerHTML += `
            <div class="todo">
              <input type="checkbox" class="check-box" value="${activitie.completed}" ${activitieCheck}>
              <input type="text" class="list-description" value="${activitie.desc}">
              <i class="fa-solid fa-ellipsis-vertical"></i>
              <button type="button" class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>`;
    });
  }
  // Cheking the checkbox and saving the data to local storage
  for (let i = 0; i < todoDiv.querySelectorAll('.todo').length; i += 1) {
    todoDiv.querySelectorAll('.todo')[i].querySelector('.check-box').addEventListener('click', () => {
      const result = checkTodo(i, activities);
      localStorage.setItem('todo', JSON.stringify(result));
      render();
    });

    todoDiv.querySelectorAll('.todo')[i].addEventListener('focusin', () => {
      todoDiv.querySelectorAll('.todo')[i].querySelector('.list-description').classList.add('active');
      todoDiv.querySelectorAll('.todo')[i].classList.add('active');
      todoDiv.querySelectorAll('.todo')[i].querySelector('.fa-ellipsis-vertical').style.display = 'none';
      todoDiv.querySelectorAll('.todo')[i].querySelector('.delete-btn').style.display = 'block';
    });
    // Deleting a todo and saving the data to local storage
    todoDiv.querySelectorAll('.todo')[i].querySelector('.delete-btn').addEventListener('click', () => {
      // Calling the delete function from the deletetodo.js file
      const updTodo = deleteItem(i, activities);
      for (let a = i; a < updTodo.length; a += 1) {
        updTodo[a].index -= 1;
      }
      index -= 1;
      localStorage.setItem('todo', JSON.stringify(updTodo));
      render();
    });
    todoDiv.querySelectorAll('.todo')[i].addEventListener('focusout', (e) => {
      const parent = todoDiv.querySelectorAll('.todo')[i];
      const leavingParent = !parent.contains(e.relatedTarget);
      if (leavingParent) {
        todoDiv.querySelectorAll('.todo')[i].classList.remove('active');
        todoDiv.querySelectorAll('.todo')[i].querySelector('.list-description').classList.remove('active');
        todoDiv.querySelectorAll('.todo')[i].querySelector('.fa-ellipsis-vertical').style.display = 'flex';
        todoDiv.querySelectorAll('.todo')[i].querySelector('.delete-btn').style.display = 'none';
      }
    });
    // Editing a todo and saving the data to local storage
    todoDiv.querySelectorAll('.todo')[i].querySelector('.list-description').addEventListener('change', (e) => {
      // Calling Updatetodo function from the updatetodo.js file
      const result = updateTodo(i, activities, e.target.value);
      localStorage.setItem('todo', JSON.stringify(result));
    });
  }
};
// While the page is first loaded it will render the todos
window.onload = render();
// Adding a todo and saving the data to local storage on press key

// Clear all buttom and saving the data to local storage
removeBtn.addEventListener('click', () => {
  activities = clearAllBtn(activities);
  index = activities.length;
  localStorage.setItem('todo', JSON.stringify(activities));
  // rendering all again
  render();
});

addText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (addText.value === '') {
      // eslint-disable-next-line no-alert
      alert('It cant be Empty');
    } else {
      const todoVal = addText.value;
      addText.value = '';
      index += 1;
      const updTodo = addAnItem({ index: index, desc: todoVal, completed: false }, activities);
      localStorage.setItem('todo', JSON.stringify(updTodo));
      render();
    }
  }
});
