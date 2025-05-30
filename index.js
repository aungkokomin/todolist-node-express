const express = require('express');
const fs = require('fs');
const readline = require('readline');

const TODO_FILE = 'todos.json';

// Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Load todos from file
function loadTodos() {
  try {
    const data = fs.readFileSync(TODO_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Save todos to file
function saveTodos(todos) {
  fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
}

// Display todos
function displayTodos(todos) {
  console.log('\nCurrent Todos:');
  todos.forEach((todo, index) => {
    console.log(`${index + 1}. [${todo.completed ? 'X' : ' '}] ${todo.text}`);
  });
  console.log();
}

// Add a new todo
function addTodo(todos, text) {
  todos.push({ text, completed: false });
  saveTodos(todos);
  console.log('Todo added successfully!');
}

// Mark a todo as completed
function completeTodo(todos, index) {
  if (index >= 0 && index < todos.length) {
    todos[index].completed = true;
    saveTodos(todos);
    console.log('Todo marked as completed!');
  } else {
    console.log('Invalid todo index!');
  }
}

// Remove a todo
function removeTodo(todos, index) {
  if (index >= 0 && index < todos.length) {
    todos.splice(index, 1);
    saveTodos(todos);
    console.log('Todo removed successfully!');
  } else {
    console.log('Invalid todo index!');
  }
}

// Main menu
function showMenu() {
  console.log('\n--- Todo List Menu ---');
  console.log('1. Display Todos');
  console.log('2. Add Todo');
  console.log('3. Complete Todo');
  console.log('4. Remove Todo');
  console.log('5. Exit');
  rl.question('Enter your choice: ', handleChoice);
}

// Handle user's menu choice
function handleChoice(choice) {
  const todos = loadTodos();

  switch (choice) {
    case '1':
      displayTodos(todos);
      showMenu();
      break;
    case '2':
      rl.question('Enter new todo: ', (text) => {
        addTodo(todos, text);
        showMenu();
      });
      break;
    case '3':
      rl.question('Enter todo index to complete: ', (index) => {
        completeTodo(todos, parseInt(index) - 1);
        showMenu();
      });
      break;
    case '4':
      rl.question('Enter todo index to remove: ', (index) => {
        removeTodo(todos, parseInt(index) - 1);
        showMenu();
      });
      break;
    case '5':
      console.log('Goodbye!');
      rl.close();
      break;
    default:
      console.log('Invalid choice. Please try again.');
      showMenu();
  }
}

// Start the application
console.log('Welcome to the Todo List App!');
showMenu();