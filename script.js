const items = document.querySelectorAll('.item');

items.forEach(item => {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.innerText);
        e.target.classList.add('dragging');
    });

    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
    });
});

const itemsContainer = document.querySelector('.items');

itemsContainer.addEventListener('dragover', (e) => {
    e.preventDefault(); // Prevent default to allow drop
});

itemsContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const draggedItem = Array.from(items).find(item => item.innerText === data);
    itemsContainer.appendChild(draggedItem); // Move the dragged item to the new location
});
describe('example to-do app', () => {
    beforeEach(() => {
        // Visit your app's page
        cy.visit('http://localhost:3000'); // Adjust the URL as necessary
    });

    it('drag & drop works correctly', () => {
        // Wait for the items to appear
        cy.get('.items', { timeout: 10000 }).should('exist');

        // Perform drag-and-drop actions
        cy.get('.items .item').first().trigger('dragstart');
        cy.get('.items .item').last().trigger('drop');

        // Add assertions to verify the drag-and-drop worked
        // For example, check if the first item is now the last in the list
        cy.get('.items .item').eq(0).should('have.text', 'Item 2'); // Adjust based on your items
    });
});