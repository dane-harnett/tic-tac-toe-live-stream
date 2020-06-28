Feature: Starting a new game

Scenario: See a blank game board
    Given I start a new game
    When the game has loaded
    Then I see a blank game board
    And I see that there are "2" players
    And I see that it is "Player 1" turn