def squares_of_sorted(nums):

    # Alternate approach is to places all negatives in one list
    # all positives in another list. After running both lists through
    # squaring process, you will have 2 sorted lists. 2 sorted lists
    # can be sorted in O(n) time

    # O(n)
    squared_nums = [x * x for x in nums]

    # O(n log n)
    squared_nums.sort()
    return squared_nums


def test_some_negative_no_duplicates():
    nums = [-4, -1, 0, 3, 10]
    assert squares_of_sorted(nums) == [0, 1, 9, 16, 100]


def test_some_duplicate_numbers():
    nums = [-7, -3, 2, 3, 11]
    assert squares_of_sorted(nums) == [4, 9, 9, 49, 121]
