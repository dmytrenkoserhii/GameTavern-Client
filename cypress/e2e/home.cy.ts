/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should have main elements visible', () => {
    cy.get('img[alt="logo"]').should('be.visible');
    cy.get('.mantine-Select-root').should('exist');
  });

  it('should change language', () => {
    cy.get('.mantine-Select-input').click();
    cy.get('.mantine-Select-dropdown').contains('UK').click();
    cy.get('a[href="/login"]').contains('Увійти').should('be.visible');

    cy.get('.mantine-Select-input').click();
    cy.get('.mantine-Select-dropdown').contains('EN').click();
    cy.get('a[href="/login"]').contains('Sign in').should('be.visible');
  });
});

describe('when logged in', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:5050/auth/sign-in', {
      email: 'user@example.com',
      password: 'StrongPassword123!',
    });
    cy.visit('http://localhost:3000');
  });

  it('should show search bar instead of sign in button', () => {
    cy.get('a[href="/login"]').should('not.exist');
    cy.get('.mantine-Autocomplete-root').should('be.visible');
  });

  it('should search for games', () => {
    cy.intercept('GET', '**/games-api/search*').as('searchGames');
    cy.get('.mantine-Autocomplete-input').type('Cyberpunk 2077');
    cy.wait('@searchGames');
    cy.get('.mantine-Autocomplete-dropdown').should('be.visible');
  });
});
