/**
 * @jest-environment jsdom
 */

const { addItem, getItemValue } = require('../js/app')
const indexFile = require('../index');
const { describe } = require('node:test');

const inputForm = document.querySelector('#input-form')
const listContainer = document.querySelector('.todo-list-container')

describe("Testing Index File", () => {
    document.body.innerHTML = indexFile()
    test('should add list item to DOM', () => {
    });
})

