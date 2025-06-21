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

        // Store the text of the first item before dragging
        cy.get('.items .item').first().invoke('text').then((firstItemText) => {
            // Perform drag-and-drop actions
            const firstItem = cy.get('.items .item').first();
            const lastItem = cy.get('.items .item').last();

            firstItem.trigger('dragstart');
            lastItem.trigger('dragover'); // Trigger dragover before drop
            lastItem.trigger('drop');

            // Add assertions to verify the drag-and-drop worked
            // Check if the first item is now in the last position
            cy.get('.items .item').last().should('have.text', firstItemText); // Check if the last item is the one dragged
        });
    });
});