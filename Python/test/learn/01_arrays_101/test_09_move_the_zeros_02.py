def move_the_zeros(nums):

    last_non_zero_found_at = 0
    current = 0

    while current < len(nums):
        if nums[current] != 0:
            temp = nums[last_non_zero_found_at]
            nums[last_non_zero_found_at] = nums[current]
            nums[current] = temp
            last_non_zero_found_at += 1

        current += 1


def test_move_the_zeros_02():
    nums = [1, 0, 2, 0, 3, 0, 4, 5, 6, 0, 0, 0, 7, 8, 9, 0]
    expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0]
    # nums = [0, 1, 0, 3, 12]
    # expected = [1, 3, 12, 0, 0]
    move_the_zeros(nums)
    assert nums == expected
