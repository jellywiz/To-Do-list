/*
* @jest-environment jsdom
*/
import clearAllBtn from './src/js/clearallbtn.js';
import checkTodo from './src/js/checktodos.js';
import updateTodo from './src/js/updatetodos.js';

describe('todo task 2 Clearbtn, Update, Checktodo', () => {
  test('clear completed todos', () => {
    const activities = [
      {
        description: 'Testing1',
        completed: true,
        index: 1,
      },
      {
        description: 'Testing2',
        completed: false,
        index: 2,
      },
    ];
    const result = clearAllBtn(activities);
    expect(result).toEqual([{ description: 'Testing2', completed: false, index: 1 }]);
    localStorage.setItem('todos', JSON.stringify(result));
    expect(JSON.parse(localStorage.getItem('todos'))).toEqual(result);
    document.body.innerHTML = '';
    for (let i = 0; i < result.length; i += 1) {
      document.body.innerHTML += '<div class="works">'
        + '  <ul id="list"><li></li></ul>'
        + '</div>';
    }
    const list = document.querySelectorAll('.works');
    expect(list).toHaveLength(result.length);
  });
});
