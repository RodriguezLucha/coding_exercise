def max_consecutive_ones(nums):
    result = 0
    current_max = 0

    for i in range(len(nums)):
        if nums[i] == 1:
            current_max = current_max + 1
            if current_max > result:
                result = current_max
        else:
            current_max = 0

    return result


def test_max_ones_at_end():
    nums = [1, 1, 0, 1, 1, 1]
    assert max_consecutive_ones(nums) == 3


def test_max_ones_in_middle():
    nums = [1, 0, 1, 1, 0, 1]
    assert max_consecutive_ones(nums) == 2
