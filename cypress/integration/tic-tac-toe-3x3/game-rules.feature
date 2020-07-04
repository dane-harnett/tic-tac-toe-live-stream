Feature: Game rules

Scenario: Can only play into an empty position
    Given I load the app
    And I start the game
    And "Player 1" plays their turn as "2:2"
    When "Player 2" plays their turn as "2:2"
    Then I see that "Player 1" has claimed "2:2"
