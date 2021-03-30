#!/usr/bin/env python


def get_permutations(string):
    if len(string) <= 1:
        return [string]
    permutations = []
    for i in range(len(string)):
        ith_character = string[i]
        string_ith_removed = string[0:i] + string[i+1:]
        for sub_permutation in get_permutations(string_ith_removed):
            permutations.append(ith_character + sub_permutation)

    return permutations


def test_permutations_two():
    input_str = "AB"
    expected = ["AB", "BA"]
    actual = get_permutations(input_str)
    assert actual == expected


def test_permutations_basic():
    input_str = "ABC"
    expected = ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"]
    actual = get_permutations(input_str)
    assert actual == expected
