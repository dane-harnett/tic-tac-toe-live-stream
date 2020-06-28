Feature: Play a game

Scenario: Play alternates from Player 1 to Player 2
    Given I start a new game
    When "Player 1" plays their turn as "2:2"
    Then I see that it is "Player 2" turn

Scenario: Play alternates from Player 2 to Player 1
    Given I start a new game
    And "Player 1" plays their turn as "2:2"
    When "Player 2" plays their turn as "1:1"
    Then I see that it is "Player 1" turn

Scenario: Player's turns are reflected in the game board
    Given I start a new game
    When "Player 1" plays their turn as "2:2"
    Then I see that "Player 1" has claimed "2:2"

Scenario: Player's turns are reflected in the game board
    Given I start a new game
    And "Player 1" plays their turn as "2:2"
    When "Player 2" plays their turn as "1:1"
    Then I see that "Player 2" has claimed "1:1"