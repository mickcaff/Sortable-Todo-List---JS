const inputForm = document.querySelector('#input-form')
const listContainer = document.querySelector('.todo-list-container')

// This function is setup to be called by an addEventListener
// Will create a new item with a text value and append it to the list container
const addItem = (item) => {
    const newItem = document.createElement('div')
    newItem.classList.add('todo-item-div')
    newItem.classList.add('dropzone')
    newItem.setAttribute('draggable', true)
    newItem.innerHTML = `
    <span class="todo-item-text" >${item}</span> <i class="fa-solid fa-delete-left fa-sm"></i>
    `
    listContainer.appendChild(newItem)
}

// This listener will take the value within the input form
// It will use the callback function above and pass in the value as an argument
inputForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const itemInput = inputForm.elements.todoItem
    addItem(itemInput.value)
    itemInput.value = ''
})

// This listener will remove an item when the icon is clicked within the items div
listContainer.addEventListener('click', (e) => {
    e.target.nodeName === 'I' && e.target.parentNode.remove()
})

//DRAG and DROP Feature
listContainer.addEventListener('dragstart', (e) => {
    dragged = e.target
    draggedIndex = Array.from(dragged.parentNode.childNodes).indexOf(dragged)
    console.log(draggedIndex)
    if (e.target.classList.contains('todo-item-div')){
        e.target.classList.remove('dropzone')
        e.target.classList.add('dragging')
    }
})

listContainer.addEventListener('dragenter', (e) => {
    if (e.target.classList.contains('dropzone')){
        e.target.classList.add('dragover')
    }
})

listContainer.addEventListener('dragleave', (e) => {
    if (e.target.classList.contains('dropzone')){
        e.target.classList.remove('dragover')
    }
})

listContainer.addEventListener('dragend', (e) => {
    if (e.target.classList.contains('todo-item-div')){
        e.target.classList.add('dropzone')
        e.target.classList.remove('dragging')
    }
})

listContainer.addEventListener('dragover', (e) => {
    e.preventDefault()
})

listContainer.addEventListener('drop', (e) => {
    e.preventDefault()
    if (e.target.classList.contains('dropzone')){
        if (e.target != dragged){
            targetSibling = e.target
            targetSiblingIndex = Array.from(targetSibling.parentNode.childNodes).indexOf(targetSibling)
            console.log(targetSiblingIndex)
            dragged.parentNode.removeChild(dragged)
            if (draggedIndex < targetSiblingIndex){
                targetSibling.after(dragged)
            } else {
                targetSibling.before(dragged)
            }
        }
    }
})

