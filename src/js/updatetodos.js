function updateTodo(i, todos, description) {
  todos[i].desc = description;
  return todos;
}

module.exports = updateTodo;