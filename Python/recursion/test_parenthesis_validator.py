#!/usr/bin/env python


def is_opener(char):
    return char in ["(", "[", "{"]


def is_closer(char):
    return char in [")", "]", "}"]


closer_to_opener = {")": "(", "]": "[", "}": "{"}


def is_valid(input_str):

    stack = []

    for char in input_str:
        if is_opener(char):
            stack.append(char)
        elif is_closer(char):
            if not stack:
                return False
            last_opener = stack.pop()
            if last_opener != closer_to_opener[char]:
                return False

    return len(stack) == 0


def test_valid_short_code():
    input_str = "(adbs)"
    assert is_valid(input_str)


def test_longer_code():
    input_str = "([]{[dssdfa]adf})[asdfa]{{adf}()}"
    assert is_valid(input_str)


def test_mismatched_opener_and_closer():
    input_str = "([sdfs][]}"
    assert not is_valid(input_str)


def test_first_is_not_valid():
    input_str = ")("
    assert not is_valid(input_str)
