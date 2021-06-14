def remove_element(nums, val):
    result = 0

    # Set low and high pointers to bottom and top of the array
    low = 0
    high = len(nums) - 1

    # Walk the pointers toward each other until they cross
    while low <= high:
        current_low = nums[low]
        current_high = nums[high]

        # If we need to "remove" the current element because its value is equal to "val"
        if current_low == val:
            # Special case when at the very beginning
            # swap it with the high
            # decrement high pointer
            # go to next iteration of loop
            # WITHOUT incrementing low
            nums[low] = current_high
            nums[high] = current_low
            high = high - 1
            result = result + 1
        else:
            # don't need to remove this element, just go to the next one
            # by incrementing low
            low = low + 1

    return len(nums) - result


def test_remove_element_simple():
    nums = [3, 2, 2, 3]
    val = 3
    expected_k = 2
    expected_arr = [2, 2]
    actual_k = remove_element(nums, val)
    assert actual_k == expected_k
    assert nums[:actual_k] == expected_arr


def test_remove_element_few_more():
    nums = [0, 1, 2, 2, 3, 0, 4, 2]
    val = 2
    expected_k = 5
    expected_arr = [0, 1, 4, 0, 3]
    actual_k = remove_element(nums, val)
    assert actual_k == expected_k
    assert sorted(nums[:actual_k]) == sorted(expected_arr)


def test_single_element():
    nums = [1]
    val = 1
    expected_k = 0
    expected_arr = []
    actual_k = remove_element(nums, val)
    assert actual_k == expected_k
    assert sorted(nums[:actual_k]) == sorted(expected_arr)


def test_two_element():
    nums = [3, 3]
    val = 3
    expected_k = 0
    expected_arr = []
    actual_k = remove_element(nums, val)
    assert actual_k == expected_k
    assert sorted(nums[:actual_k]) == sorted(expected_arr)
