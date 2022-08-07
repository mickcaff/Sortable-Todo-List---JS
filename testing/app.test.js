/**
 * @jest-environment jsdom
 */

// const { addItem, getItemValue } = require('../js/app')
// const indexFile = require('../index');
// const { describe } = require('node:test');

// const inputForm = document.querySelector('#input-form')
// const listContainer = document.querySelector('.todo-list-container')

// describe("Testing Index File", () => {
//     document.body.innerHTML = indexFile()
//     test('should add list item to DOM', () => {
//     });
// })



// test('Check addTodo function is able add todo to todoList', () => {
//     document.body.innerHTML = `
//       <input id="newTodoInput" />
//       <button id="addTodoBtn">Add todo</button>
//       <ol id="todoList"></ol>
//     `;
//     require('./script.js');
 
//     const newTodoInput = document.getElementById('newTodoInput');
//     const addTodoBtn = document.getElementById('addTodoBtn');
//     const todolist = document.getElementById('todoList');
 
//     newTodoInput.value = 'welcome to coding ninjas!';
//     addTodoBtn.click();
 
//     expect(todolist.innerHTML).toBe('<li>welcome to coding ninjas!</li>');
//   });