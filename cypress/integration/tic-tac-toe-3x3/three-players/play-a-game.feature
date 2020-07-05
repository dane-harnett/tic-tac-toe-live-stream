Feature: 3 players on 3x3 game board > Play a game

  Scenario: Play rotates from Player 2 to Player 3
    Given I load the app
    And I enter 3 as the number of players
    And I start the game
    And "Player 1" plays their turn as "2:2"
    When "Player 2" plays their turn as "1:1"
    Then I see that it is "Player 3" turn

  Scenario: Play alternates from Player 3 to Player 1
    Given I load the app
    And I enter 3 as the number of players
    And I start the game
    And "Player 1" plays their turn as "2:2"
    And "Player 2" plays their turn as "1:1"
    When "Player 3" plays their turn as "0:1"
    Then I see that it is "Player 1" turn
