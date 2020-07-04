import { Given } from "cypress-cucumber-preprocessor/steps";

import playerMarkers from "../../../src/constants/playerMarkers";

Given("I load the app", () => {
  cy.visit("/");
});

When("the app has loaded", () => {
  cy.get("#app");
});

Then("I see the game config screen", () => {
  cy.get("#game-config");
  cy.get("#game-board-size-width");
  cy.get("#game-board-size-height");
  cy.get("#start-game");
});

When("I enter {int} as the game board size width", (size) => {
  cy.get("#game-board-size-width").type(`{selectall}{backspace}${size}`);
});

When("I enter {int} as the game board size height", (size) => {
  cy.get("#game-board-size-height").type(`{selectall}{backspace}${size}`);
});

When("I start the game", () => {
  cy.get("#start-game").click();
});

When("I choose to play again", () => {
  cy.get("#play-again").click();
});

Then("I see a blank {int}x{int} game board", (width, height) => {
  cy.get("#game").within(() => {
    cy.get("#game-board").within(() => {
      for (let row = 0; row < height - 1; row++) {
        for (let col = 0; col < width - 1; col++) {
          cy.get(`#cell-${row}-${col}`).should("have.text", "");
        }
      }
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

When(/I see that "(.*)" has claimed "(.*):(.*)"/, (player, row, col) => {
  cy.get(`#cell-${row}-${col}`).should(
    "have.text",
    player === "Player 1" ? playerMarkers[0] : playerMarkers[1]
  );
});

Then(/I see that "(.*)" has won the game/, (player) => {
  const winner = player === "Player 1" ? playerMarkers[0] : playerMarkers[1];
  cy.get(`#winner`).should("have.text", `${winner} has won the game`);
});

Then(/I see that the game has ended in a tie/, () => {
  cy.get(`#tie`).should("have.text", `The game has ended in a tie`);
});
