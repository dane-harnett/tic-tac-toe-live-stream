Feature: Starting a new game

Scenario: See a blank game board
    Given I start a new game
    When the game has loaded
    Then I see a blank game board