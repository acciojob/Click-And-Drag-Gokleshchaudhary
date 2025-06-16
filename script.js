describe('Drag and Drop Functionality', () => {
    beforeEach(() => {
        cy.visit('/'); // Adjust the URL as necessary
    });

    it('drag & drop works correctly', { defaultCommandTimeout: 10000 }, () => { // Set default timeout for this test
        // Wait for the items to be present
        cy.get('.item', { timeout: 10000 }).should('have.length.greaterThan', 0); // Wait for items to load

        // Start dragging the first item
        cy.get('.item').first().trigger('dragstart');

        // Simulate dragging over the drop area
        cy.get('.items').trigger('dragover');

        // Drop the item
        cy.get('.item').last().trigger('drop');

        // Check if the first item is now in the last position
        cy.get('.items').children().last().should('have.text', 'Task 1');
    });
});
describe('Drag and Drop Functionality', () => {
    beforeEach(() => {
        cy.visit('/'); // Adjust the URL to match your app
    });

    it('drag & drop works correctly', () => {
        // Ensure items are present
        cy.get('.item').should('have.length.greaterThan', 0);

        // Start dragging the first item
        cy.get('.item').first().trigger('dragstart');

        // Simulate dragging over the drop area
        cy.get('.items').trigger('dragover');

        // Drop the item
        cy.get('.item').last().trigger('drop');

        // Check if the first item is now in the last position
        cy.get('.items').children().last().should('have.text', 'Task 1');
    });
});