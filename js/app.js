const inputForm = document.querySelector('#input-form')
const listContainer = document.querySelector('.todo-list-container')


const addItem = (item) => {
    const newItem = document.createElement('div')
    newItem.classList.add('todo-item-div')
    newItem.innerHTML = `
    <span class="todo-item-text" >${item}</span> <i class="fa-solid fa-delete-left fa-sm"></i>
    `
    listContainer.appendChild(newItem)
}

inputForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const itemInput = inputForm.elements.todoItem
    addItem(itemInput.value)
})

listContainer.addEventListener('click', (e) => {
    console.log(e.target.parentNode)
    e.target.nodeName === 'I' && e.target.parentNode.remove()
})
