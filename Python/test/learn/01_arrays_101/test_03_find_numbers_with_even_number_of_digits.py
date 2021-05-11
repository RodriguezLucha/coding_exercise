def is_num_even(num):
    return len(str(num)) % 2 == 0


def find_numbers(nums):
    result = 0

    # Loop over nums O(nums)
    for num in nums:

        if is_num_even(num):
            result = result + 1

    return result


def test_two_even_digits():
    nums = [12, 345, 2, 6, 7896]
    assert find_numbers(nums) == 2


def test_one_even_digits():
    nums = [555, 901, 482, 1771]
    assert find_numbers(nums) == 1
