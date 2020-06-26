import { Given } from "cypress-cucumber-preprocessor/steps";

Given("I start a new game", () => {
  cy.visit("/");
});

When("the game has loaded", () => {
  cy.get("#game");
});

Then("I see a blank game board", () => {
  cy.get("#game-board").find("#cell-0-0").should("have.text", "");

  cy.get("#game-board").find("#cell-0-1").should("have.text", "");
  cy.get("#game-board").find("#cell-0-2").should("have.text", "");

  cy.get("#game-board").find("#cell-1-0").should("have.text", "");
  cy.get("#game-board").find("#cell-1-1").should("have.text", "");
  cy.get("#game-board").find("#cell-1-2").should("have.text", "");

  cy.get("#game-board").find("#cell-2-0").should("have.text", "");
  cy.get("#game-board").find("#cell-2-1").should("have.text", "");
  cy.get("#game-board").find("#cell-2-2").should("have.text", "");
});
