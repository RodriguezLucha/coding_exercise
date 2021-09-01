def remove_duplicates_from_sorted_array(nums):

    if nums == []:
        return 0

    slow_pointer = 0
    fast_pointer = 1

    while fast_pointer < len(nums):

        fast_element = nums[fast_pointer]
        slow_element = nums[slow_pointer]

        if fast_element != slow_element:
            slow_pointer += 1
            nums[slow_pointer] = fast_element

        if fast_pointer < len(nums):
            fast_pointer += 1

    return slow_pointer + 1


def test_remove_duplicatesfrom_sorted_array():
    nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
    actual = remove_duplicates_from_sorted_array(nums)

    assert nums[:actual] == [0, 1, 2, 3, 4]
