describe('Testing the ACME System 1 web application', () => {
  it('Log in to the system', () => {
    cy.visit('https://acme-test.uipath.com/login')

    cy.get('#email')
      .type(Cypress.env('username'))
    cy.get('#password')
      .type(Cypress.env('password'), {log: false})
    cy.get('button').contains('Login').click()
    
    cy.url().should('include', 'https://acme-test.uipath.com/home')
  })

  it('Navigate to Work Items', () => {
    cy.get('button')
      .contains('Work Items').click()

    cy.get('h1.page-header').should('contain', 'Work Items')
  })

  it('Searches for invoice', () => {
    cy.get('button')
      .contains('Invoices').click()
  
    cy.get('.rightMenu').contains('Search for Invoice').click({force: true})
    cy.get('#invoiceNumber')
      .type('222831')
    cy.get('#buttonSearch').click()

    cy.get('.table').contains('td', 'IT754893')
  })

  it('Receive a Customer Service call', () => {
    cy.get('button')
      .contains('Customer Service').click()
  
    cy.get('#answer-call-button').should('be.disabled')

    cy.get('#btn-trigger').click()
    cy.get('#incomingCall').should('be.visible')

    cy.get('#answer-call-button').click()
    cy.get('#myStatus').should('contain', 'Call active')

    cy.get('#hang-upl-button').click()
  })

  it('Get the correct employee from list', () => {
    cy.get('button')
      .contains('Employees').click()
    
    cy.get('.modal-content').find('div[id=candidateName]').then($employeeName => {
      let name = $employeeName.text()
      cy.get('#refreshBtn').click()
      
      cy.get('i[onClick*="'+ name +'"]').click()
      cy.get('#card_name').should('contain', name)
    })
    cy.get('button').contains('Close').click()
  })
})
