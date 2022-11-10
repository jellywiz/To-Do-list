function deleteItem(i, todos) {
  todos.splice(i, 1);
  return todos;
}

module.exports = deleteItem;
