Feature: Starting a new game

  Scenario: See the game config screen
    Given I load the app
    When the app has loaded
    Then I see the game config screen

  Scenario: See a blank game board
    Given I load the app
    And I enter 3 as the game board size width
    And I enter 3 as the game board size height
    When I start the game
    Then I see a blank 3x3 game board
    And I see that there are "2" players
    And I see that it is "Player 1" turn

  Scenario: Play the game again after another game has started
    Given I load the app
    And I start the game
    And "Player 1" plays their turn as "2:2"
    When I choose to play again
    Then I see a blank 3x3 game board
    And I see that there are "2" players
    And I see that it is "Player 1" turn
