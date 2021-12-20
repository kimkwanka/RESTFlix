import faker from 'faker';

import { cy, describe, it, expect } from 'local-cypress';

describe('Happy Path', () => {
  const username = faker.internet.userName().replace(/[^A-Za-z0-9]/g, '');
  const password = faker.internet.password();
  const email = faker.internet.email();

  const movie = faker.animal.type();

  it('Should allow a typical user flow', () => {
    // REGISTER
    cy.visit('http://localhost:3000/register');

    cy.findByRole('textbox', { name: /username/i }).type(username);
    cy.findByLabelText(/password/i).type(password);
    cy.findByRole('textbox', { name: /email/i }).type(email);

    cy.findByRole('button', { name: /sign up/i }).click();

    // LOGIN
    cy.url().should('contain', '/login');

    cy.findByRole('textbox', { name: /username/i })
      .clear() // clear demo username
      .type(username);
    cy.findByLabelText(/password/i)
      .clear() // clear demo password
      .type(password);

    cy.findByRole('button', { name: /sign in/i }).click();

    // NEXT PAGE
    cy.findAllByRole('link', { name: /next/i }).first().click();

    // PREVIOUS PAGE
    cy.findAllByRole('link', { name: /prev/i }).first().click();

    // ENTER MOVIE PAGE
    cy.get('.movies-list').children().first().click();

    // ADD TO FAVORITES
    cy.findByRole('button', { name: /add/i }).click();

    // REMOVE FROM FAVORITES
    cy.findByRole('button', { name: /remove/i }).click();

    // ENTER GENRE PAGE
    cy.findByText(/genres/i)
      .children()
      .first()
      .click();

    cy.url().should('contain', '/genre');

    // SEARCH MOVIES
    cy.findByRole('button', { name: /⌕/i }).click();
    cy.findByPlaceholderText(/search/i).type(`${movie}{enter}`);

    expect(cy.findByText(/search results/i).should('contain', movie));

    // ENTER PROFILE PAGE
    cy.findByRole('link', { name: /profile/i }).click();

    // CHANGE USERNAME
    cy.findByRole('textbox', { name: /username/i })
      .clear() // clear username
      .type(`${username}777`);

    cy.findByRole('button', { name: /update/i }).click();

    expect(
      cy
        .findByRole('textbox', { name: /username/i })
        .should('have.value', `${username}777`),
    );

    // LOGOUT
    cy.findByRole('link', { name: /sign out/i }).click();

    // LOGIN WITH CHANGED USERNAME
    expect(cy.url().should('contain', '/login'));

    cy.findByRole('textbox', { name: /username/i })
      .clear() // clear demo username
      .type(`${username}777`);
    cy.findByLabelText(/password/i)
      .clear() // clear demo password
      .type(password);

    cy.findByRole('button', { name: /sign in/i }).click();

    // RE-ENTER PROFILE PAGE
    cy.findByRole('link', { name: /profile/i }).click();

    // DELETE PROFILE
    cy.findByRole('button', { name: /delete/i }).click();

    // CONFIRM DELETE DIALOGUE
    cy.on('window:confirm', () => true);
  });
});