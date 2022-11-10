/*
* @jest-environment jsdom
*/
/* eslint-disable import/no-unresolved */

const deleteItem = require('./src/js/deletetodo.js');
const addTodo = require('./src/js/addtodos.js');
// ------------------------------------------------------------
describe('todo functions ADD', () => {
  test('add a todo', () => {
    const activitie = {
      description: 'Testing',
      completed: false,
      index: 0,
    };
    const activities = [];

    const result = addTodo(activitie, activities);
    expect(activities).toEqual(result);
    localStorage.setItem('activities', JSON.stringify(result));
    expect(JSON.parse(localStorage.getItem('activities'))).toEqual(result);
    for (let i = 0; i < result.length; i += 1) {
      document.body.innerHTML += '<div class="works">'
        + '  <ul id="list"><li></li></ul>'
        + '</div>';
    }
    const list = document.querySelectorAll('.works');
    expect(list).toHaveLength(result.length);
  });
  test('delete an item', () => {
    const activities = [
      {
        desc: 'Testing1',
        completed: false,
        index: 0,
      },
      {
        desc: 'Testing2',
        completed: false,
        index: 1,
      },
    ];
    const i = 0;
    const result = deleteItem(i, activities);
    expect(result).toEqual([{ desc: 'Testing2', completed: false, index: 1 }]);
    localStorage.setItem('activities', JSON.stringify(result));
    expect(JSON.parse(localStorage.getItem('activities'))).toEqual(result);
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
// ----------------------------------------------------