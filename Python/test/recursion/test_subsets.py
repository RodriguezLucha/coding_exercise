#!/usr/bin/env python


def subsets(input):
    result = []
    sub = []

    def recur(start):
        result.append([e for e in sub])
        for i in range(start, len(input)):
            sub.append(input[i])
            recur(i + 1)
            sub.pop()

    recur(0)
    return result


def test_subsets():
    input = [1, 2, 3]
    actual = subsets(input)
    expected = [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]
    assert actual == expected
