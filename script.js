const items = document.querySelectorAll('.item');

items.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.innerText);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove('hide');
}

const container = document.querySelector('.items');

container.addEventListener('dragover', dragOver);
container.addEventListener('drop', drop);

function dragOver(e) {
    e.preventDefault(); // Prevent default to allow drop
}

function drop(e) {
    e.preventDefault();
    const draggedItemText = e.dataTransfer.getData('text/plain');
    const draggedItem = Array.from(items).find(item => item.innerText === draggedItemText);
    
    // Append the dragged item to the drop location
    container.appendChild(draggedItem);
}