Feature: Starting a new game

Scenario: See a blank game board
    Given I load the app
    And I enter 6 as the game board size width
    And I enter 6 as the game board size height
    When I start the game
    Then I see a blank 6x6 game board
    And I see that there are "2" players
    And I see that it is "Player 1" turn

Scenario: Start a new game after another game has started
    Given I load the app
    And I enter 6 as the game board size width
    And I enter 6 as the game board size height
    And I start the game
    And "Player 1" plays their turn as "2:2"
    When I choose to play again
    Then I see a blank 6x6 game board
    And I see that there are "2" players
    And I see that it is "Player 1" turn