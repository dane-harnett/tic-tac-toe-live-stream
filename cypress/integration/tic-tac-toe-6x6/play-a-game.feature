Feature: Play a game

  Scenario: Player 1 wins the game
    Given I load the app
    And I enter 6 as the game board size width
    And I enter 6 as the game board size height
    And I start the game
    And "Player 1" plays their turn as "3:3"
    And "Player 2" plays their turn as "3:5"
    And "Player 1" plays their turn as "4:3"
    And "Player 2" plays their turn as "4:5"
    When "Player 1" plays their turn as "5:3"
    Then I see that "Player 1" has won the game

  Scenario: Player 2 wins the game
    Given I load the app
    And I enter 6 as the game board size width
    And I enter 6 as the game board size height
    And I start the game
    And "Player 1" plays their turn as "0:2"
    And "Player 2" plays their turn as "0:0"
    And "Player 1" plays their turn as "1:2"
    And "Player 2" plays their turn as "1:0"
    And "Player 1" plays their turn as "1:1"
    When "Player 2" plays their turn as "2:0"
    Then I see that "Player 2" has won the game
