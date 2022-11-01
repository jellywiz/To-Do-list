import '../style.css';

const activities = [
  { index: 0, description: 'Play video game', completed: false },
  { index: 1, description: 'Write JavaScript code', completed: true },
  { index: 2, description: 'Chores', completed: true },
];

for (let i = 0; i < activities.length; i += 1) {
  document.querySelector('.lists').innerHTML
            += `<div class='todo'>
                    <input type='checkbox' class="check-box" value="false">
                    <input type="text" class="list-description" id="list${i}">
                    <i class="fa-solid fa-ellipsis-vertical"></i>  
                </div>`;
}

for (let i = 0; i < activities.length; i += 1) {
  document.getElementById(`list${i}`).value = activities[i].description;
}