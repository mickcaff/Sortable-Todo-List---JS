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
    <i class="fa-solid fa-right-left fa-rotate-90 fa-xs"></i>
    <span class="todo-item-text" >${item}</span> 
    <i class="fa-solid fa-delete-left fa-sm"></i>
    `
    listContainer.appendChild(newItem)
}

// getItemValue will firstly stop the default action when submitting the form
// Then take the input value from the form and pass it into the addItem function
// The addItem function will add this value and accompanying HTML to the DOM
// Finally the input field is cleared
const getItemValue = (e) => {
    e.preventDefault()
    const itemInput = inputForm.elements.todoItem
    addItem(itemInput.value)
    itemInput.value = ''
}

// The input form is listening for the submit action to callback the getItemValue
inputForm.addEventListener('submit', getItemValue)


// deleteItem will check that target HTML element has a class of 'fa-delete-left'
// This class is the class given to the delete icon
// If this is true it will then remove the parent element which is the item div
const deleteItem = (e) => {
    e.target.classList.contains('fa-delete-left') && e.target.parentNode.remove()
}

// This listener will remove an item when the icon is clicked within the items div
listContainer.addEventListener('click', deleteItem)


// DRAG AND DROP FEATURE
// The following listeners on the listContainer create the drag and drop functionality

// getDraggedIndex will save the target object as the variable dragged
// then using Array.from iterate of the parent nodes children, which
// is an array of the target and it's siblings
// then the index of the target is determined by .indexOf()
// this index corresponds to the targets key (e.g 0,1,2,3) in the childNodes
// this index will be used later to determine the childNodes position relative to its other siblings
const getDraggedIndex = (e) => {
    dragged = e.target
    draggedIndex = Array.from(dragged.parentNode.childNodes).indexOf(dragged)
    console.log(draggedIndex)
}

// addDraggingClass & removeDraggingClass both replace the class dropzone
// with dragging and vice versa. 
// this is used for style changes while dragging and determining
// and will determine the elements that will act as 'drop zones' when the dragged item is dropped 
const addDraggingClass = (e) => {
    if (e.target.classList.contains('todo-item-div')){
        e.target.classList.replace('dropzone', 'dragging')
    }
}
const removeDraggingClass = (e) => {
    if (e.target.classList.contains('todo-item-div')){
        e.target.classList.replace('dragging', 'dropzone')
    }
}

// addDraggingClass & removeDraggingClass are applied to 'dragstart' and 'dragend'
listContainer.addEventListener('dragstart', (e) => {
    getDraggedIndex(e)
    addDraggingClass(e)
})
listContainer.addEventListener('dragend', removeDraggingClass)


// addDragoverClass & removeDragoverClass are both used to check
// if the element it is being 'dragged over' contains the class 'dropzone'
// if true then the class dragover is added, which is used to add styling 
// while the element is being dragged over
// the functions are used as callbacks for both the 'dragenter' and 'dragleave' events below
const addDragoverClass = (e) => {
    if (e.target.classList.contains('dropzone')){
        e.target.classList.add('dragover')
    }
}
const removeDragoverClass = (e) => {
    if (e.target.classList.contains('dropzone')){
        e.target.classList.remove('dragover')
    }
}

listContainer.addEventListener('dragenter', addDragoverClass)
listContainer.addEventListener('dragleave', removeDragoverClass)

// in the dragover event handler for the target container, 
// we call event.preventDefault(), which enables it to receive drop events.
listContainer.addEventListener('dragover', (e) => {
    e.preventDefault()
})


// Below is the logic for the Drop event

// dropSwapItems, is called by dropConditionals 
// begins by getting the index of the target sibling
// then the dragged item is removed 
// the dragged item index and target sibling index are compared
// depending on the index the dragged item is re-inserted back into the HTML either before or after the target
// finally the styling which uses the class 'dragover' is removed
const dropSwapItems = (target) => {
    targetSiblingIndex = Array.from(target.parentNode.childNodes).indexOf(targetSibling)
    dragged.parentNode.removeChild(dragged)
    if (draggedIndex < targetSiblingIndex){
        targetSibling.after(dragged)
    } else {
        targetSibling.before(dragged)
    }
    targetSibling.classList.remove('dragover')
}

// dropConditionals logic relates to the how the html elements of each of the to-do list items are placed on top of each other in the z-index
// due to the target container 'dropzone' being beneath the text and up-down arrows icon 
// the text and icon also needed to be included in potential targets
// the logic first checks that the target has the classes of either dropzone, todo-item-text or fa-right-left
// in the case of the todo-item-text and icon, the targetSibling is the parentNode of the target
// dropSwapItems is then called in both cases
const dropConditionals = (e) => {
    e.preventDefault()
    if ((e.target.classList.contains('dropzone')) || (e.target.classList.contains('todo-item-text')) || (e.target.classList.contains('fa-right-left'))) {
        if ((e.target != dragged) && (e.target.classList.contains('dropzone'))){
            targetSibling = e.target
            dropSwapItems(targetSibling)
        }
        if ((e.target != dragged) && ((e.target.classList.contains('todo-item-text')) || (e.target.classList.contains('fa-right-left')))){
            targetSibling = e.target.parentNode
            dropSwapItems(targetSibling)
        }
    }
}

listContainer.addEventListener('drop', dropConditionals)

module.exports = {
    addItem,
    getItemValue
}


