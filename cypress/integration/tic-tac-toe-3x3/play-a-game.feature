Feature: Play a game

  Scenario: Play alternates from Player 1 to Player 2
    Given I load the app
    And I start the game
    When "Player 1" plays their turn as "2:2"
    Then I see that it is "Player 2" turn

  Scenario: Play alternates from Player 2 to Player 1
    Given I load the app
    And I start the game
    And "Player 1" plays their turn as "2:2"
    When "Player 2" plays their turn as "1:1"
    Then I see that it is "Player 1" turn

  Scenario: Player's turns are reflected in the game board
    Given I load the app
    And I start the game
    When "Player 1" plays their turn as "2:2"
    Then I see that "Player 1" has claimed "2:2"

  Scenario: Player's turns are reflected in the game board
    Given I load the app
    And I start the game
    And "Player 1" plays their turn as "2:2"
    When "Player 2" plays their turn as "1:1"
    Then I see that "Player 2" has claimed "1:1"

  Scenario: Player 1 wins the game
    Given I load the app
    And I start the game
    And "Player 1" plays their turn as "0:0"
    And "Player 2" plays their turn as "0:2"
    And "Player 1" plays their turn as "1:0"
    And "Player 2" plays their turn as "1:2"
    When "Player 1" plays their turn as "2:0"
    Then I see that "Player 1" has won the game

  Scenario: Player 2 wins the game
    Given I load the app
    And I start the game
    And "Player 1" plays their turn as "0:2"
    And "Player 2" plays their turn as "0:0"
    And "Player 1" plays their turn as "1:2"
    And "Player 2" plays their turn as "1:0"
    And "Player 1" plays their turn as "1:1"
    When "Player 2" plays their turn as "2:0"
    Then I see that "Player 2" has won the game

  Scenario: Game ends in a tie
    Given I load the app
    And I start the game
    And "Player 1" plays their turn as "0:0"
    And "Player 2" plays their turn as "1:0"
    And "Player 1" plays their turn as "2:0"
    And "Player 2" plays their turn as "2:1"
    And "Player 1" plays their turn as "0:1"
    And "Player 2" plays their turn as "0:2"
    And "Player 1" plays their turn as "1:1"
    And "Player 2" plays their turn as "2:2"
    When "Player 1" plays their turn as "1:2"
    Then I see that the game has ended in a tie