#!/usr/bin/env python


class Solution(object):
    def search(self, A, t):
        left = 0
        right = len(A) - 1

        while True:
            if right < left:
                return -1

            m = (left + right) // 2
            val = A[m]

            if t > val:
                left = m + 1
            if t < val:
                right = m - 1
            if t == val:
                return m


def test_basic_found():
    s = Solution()
    A = [-1, 0, 3, 5, 9, 12]
    target = 9
    expected = 4
    actual = s.search(A, target)
    assert actual == expected


def test_basic_not_found():
    s = Solution()
    A = [-1, 0, 3, 5, 9, 12]
    target = 9
    expected = 4
    actual = s.search(A, target)
    assert actual == expected


def test_basic_one_found():
    s = Solution()
    A = [1]
    target = 1
    expected = 0
    actual = s.search(A, target)
    assert actual == expected


def test_basic_none():
    s = Solution()
    A = []
    target = 1
    expected = -1
    actual = s.search(A, target)
    assert actual == expected


def test_basic_odd():
    s = Solution()
    A = [1, 2, 3]
    target = 2
    expected = 1
    actual = s.search(A, target)
    assert actual == expected


def test_basic_even_left():
    s = Solution()
    A = [1, 2, 3, 4]
    target = 3
    expected = 2
    actual = s.search(A, target)
    assert actual == expected


def test_basic_even_right():
    s = Solution()
    A = [1, 2, 3, 4]
    target = 2
    expected = 1
    actual = s.search(A, target)
    assert actual == expected


def test_basic_even_edge_left():
    s = Solution()
    A = [1, 2, 3, 4]
    target = 1
    expected = 0
    actual = s.search(A, target)
    assert actual == expected


def test_two_right():
    s = Solution()
    A = [1, 2]
    target = 2
    expected = 1
    actual = s.search(A, target)
    assert actual == expected


def test_two_left():
    s = Solution()
    A = [1, 2]
    target = 1
    expected = 0
    actual = s.search(A, target)
    assert actual == expected


def test_basic_even_edge_right():
    s = Solution()
    A = [1, 2, 3, 4]
    target = 4
    expected = 3
    actual = s.search(A, target)
    assert actual == expected
