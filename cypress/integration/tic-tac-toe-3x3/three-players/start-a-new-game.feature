Feature: 3 players on 3x3 game board > Starting a new game

  Scenario: See a blank game board
    Given I load the app
    And I enter 3 as the number of players
    When I start the game
    Then I see a blank 3x3 game board
    And I see that there are "3" players
    And I see that it is "Player 1" turn
