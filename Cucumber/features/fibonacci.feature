Feature: Calculate first N Fibonacci numbers

    Classic problem to demonstrate recursion

    Scenario: Calculate first 10 Fibonacci numbers
        Given a fibonacci function
        When asking for the first 10 numbers
        Then the result is "1, 1, 2, 3, 5, 8, 13, 21, 34, 55"
    Scenario: Calculate first 2 Fibonacci numbers
        Given a fibonacci function
        When asking for the first 2 numbers
        Then the result is "1, 1"