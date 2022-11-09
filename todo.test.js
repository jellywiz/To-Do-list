/*
* @jest-environment jsdom
*/
/* eslint-disable import/no-unresolved */

const deleteItem = require('./src/js/deletetodo.js');
const addTodo = require('./src/js/addtodos.js');

describe('todo functions ADD', () => {
  test('add a todo', () => {
    const todo = {
      description: 'Testing',
      completed: false,
      index: 0,
    };
    const todos = [];

    const result = addTodo(todo, todos);
    expect(todos).toEqual(result);
    localStorage.setItem('todos', JSON.stringify(result));
    expect(JSON.parse(localStorage.getItem('todos'))).toEqual(result);
    for (let i = 0; i < result.length; i += 1) {
      document.body.innerHTML += '<div class="works">'
        + '  <ul id="list"><li></li></ul>'
        + '</div>';
    }
    const list = document.querySelectorAll('.works');
    expect(list).toHaveLength(result.length);
  });
  test('delete an item', () => {
    const todos = [
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
    const result = deleteItem(i, todos);
    expect(result).toEqual([{ desc: 'Testing2', completed: false, index: 1 }]);
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