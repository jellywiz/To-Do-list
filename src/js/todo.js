/* eslint-dsibale no-loop-func, no-func-assign, no-class-assign */
const addText = document.querySelector('.input-text');
const todoDiv = document.querySelector('.lists');
const removeBtn = document.querySelector('.remove-btn');
let activities = localStorage.getItem('todo') !== null ? JSON.parse(localStorage.getItem('todo')) : [];
let index = activities.length;

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

  for (let i = 0; i < todoDiv.querySelectorAll('.todo').length; i += 1) {
    todoDiv.querySelectorAll('.todo')[i].querySelector('.check-box').addEventListener('click', () => {
      activities[i].completed = !activities[i].completed;
      localStorage.setItem('todo', JSON.stringify(activities));
    });

    todoDiv.querySelectorAll('.todo')[i].addEventListener('focusin', () => {
      todoDiv.querySelectorAll('.todo')[i].classList.add('active');
      todoDiv.querySelectorAll('.todo')[i].querySelector('.list-description').classList.add('active');
      todoDiv.querySelectorAll('.todo')[i].querySelector('.delete-btn').style.display = 'block';
      todoDiv.querySelectorAll('.todo')[i].querySelector('.fa-ellipsis-vertical').style.display = 'none';
    });

    todoDiv.querySelectorAll('.todo')[i].querySelector('.delete-btn').addEventListener('click', () => {
      activities.splice(i, 1);
      for (let a = i; a < activities.length; a += 1) {
        activities[a].index -= 1;
      }
      index -= 1;
      localStorage.setItem('todo', JSON.stringify(activities));
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

    todoDiv.querySelectorAll('.todo')[i].querySelector('.list-description').addEventListener('change', (e) => {
      activities[i].desc = e.target.value;
      localStorage.setItem('todo', JSON.stringify(activities));
    });
  }
};

addText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (addText.value === '') {
      // eslint-disable-next-line no-alert
      alert('It cant be Empty');
    } else {
      const todoVal = addText.value;
      addText.value = '';
      index += 1;
      activities.push(
        {
          index: index,
          desc: todoVal,
          completed: false,
        },
      );
      localStorage.setItem('todo', JSON.stringify(activities));
      render();
    }
  }
});

removeBtn.addEventListener('click', () => {
  activities = activities.filter((todo) => todo.completed !== true);
  for (let i = 0; i < activities.length; i += 1) {
    activities[i].index = i + 1;
  }
  index = activities.length;
  localStorage.setItem('todo', JSON.stringify(activities));
  render();
});

window.onload = render();