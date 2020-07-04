Feature: Starting a new game

Scenario: See a blank game board
    Given I load the game
    When the game has loaded
    Then I see a blank 3x3 game board
    And I see that there are "2" players
    And I see that it is "Player 1" turn

Scenario: Start a new game after another game has started
    Given I load the game
    And "Player 1" plays their turn as "2:2"
    When I start a new game
    Then I see a blank 3x3 game board
    And I see that there are "2" players
    And I see that it is "Player 1" turn