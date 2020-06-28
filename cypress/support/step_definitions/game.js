import { Given } from "cypress-cucumber-preprocessor/steps";

Given("I start a new game", () => {
  cy.visit("/");
});

When("the game has loaded", () => {
  cy.get("#game");
});

Then("I see a blank game board", () => {
  cy.get("#game").within(() => {
    cy.get("#game-board").within(() => {
      cy.get("#cell-0-0").should("have.text", "");
      cy.get("#cell-0-1").should("have.text", "");
      cy.get("#cell-0-2").should("have.text", "");

      cy.get("#cell-1-0").should("have.text", "");
      cy.get("#cell-1-1").should("have.text", "");
      cy.get("#cell-1-2").should("have.text", "");

      cy.get("#cell-2-0").should("have.text", "");
      cy.get("#cell-2-1").should("have.text", "");
      cy.get("#cell-2-2").should("have.text", "");
    });
  });
});

Then('I see that there are "2" players', () => {
  cy.get("#game").within(() => {
    cy.get("#player1").should("contain", "Player 1");
    cy.get("#player2").should("contain", "Player 2");
  });
});

Then('I see that it is "Player 1" turn', () => {
  cy.get("#game").within(() => {
    cy.get("#player1").should("have.text", "> Player 1");
    cy.get("#player2").should("have.text", "Player 2");
  });
});

Then('I see that it is "Player 2" turn', () => {
  cy.get("#game").within(() => {
    cy.get("#player2").should("have.text", "> Player 2");
    cy.get("#player1").should("have.text", "Player 1");
  });
});

When(/"(.*)" plays their turn as "(.*):(.*)"/, (player, row, col) => {
  cy.get(`#cell-${row}-${col}`).click();
});
