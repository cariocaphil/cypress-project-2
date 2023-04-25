describe('contact form', () => {
    it('should submit the form', () => {
      cy.visit('http://localhost:5173/about')
      cy.get('[data-cy="contact-input-message"]').type('Hello World');
      cy.get('[data-cy="contact-input-name"]').type('John Doe');
      cy.get('[data-cy="contact-input-email"]').type('test@example.com{enter}');
      cy.get('[data-cy="contact-btn-submit"]').contains('Send Message').should('not.have.attr', 'disabled');
      cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
      cy.get('@submitBtn').click();
      cy.get('@submitBtn').contains('Sending...');
      cy.get('@submitBtn').should('have.attr', 'disabled');
    })

    it('should validate form input', () => {
      cy.visit('http://localhost:5173/about')
      cy.get('[data-cy="contact-btn-submit"]').click();
      cy.get('[data-cy="contact-btn-submit"]').then(el => {
        expect(el).not.to.have.attr('disabled');
        expect(el.text()).to.not.equal('Sending');
      })
      cy.get('[data-cy="contact-btn-submit"]').contains('Send Message');

      cy.get('[data-cy="contact-input-message"]').as('msgInput')
      cy.get('@msgInput').click();
      cy.get('@msgInput').blur();
      cy.get('@msgInput')
      .parent((el) => {
        expect(el.attr('class')).to.contains('invalid')
      });

      cy.get('[data-cy="contact-input-name"]').as('nameInput');
      cy.get('@nameInput').click();
      cy.get('@nameInput').blur();
      cy.get('@nameInput')
      .parent()
      .then((el) => {
        expect(el.attr('class')).to.contains('invalid');
      })
      cy.get('[data-cy="contact-input-email"]').as('emailInput');
      cy.get('@emailInput').click();
      cy.get('@emailInput').blur();
      cy.get('@emailInput')
      .parent()
      .then((el) => {
        expect(el.attr('class')).to.contains('invalid');
      })
    })
  })