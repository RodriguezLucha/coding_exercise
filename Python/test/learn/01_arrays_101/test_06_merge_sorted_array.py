def merge_sorted_arrays(nums1, m, nums2, n):

    # Get 2 pointers to the top of each array largest element
    top_index_m = m - 1
    top_index_n = n - 1
    # And a pointer to the top of m, where things will be copied to
    top_m_copy_to_index = len(nums1) - 1

    # Now whichever is higher should be copied over to top of m
    # walking backwards like a typical merge operation in a merge sort
    while top_index_m >= 0 and top_index_n >= 0:
        top_element_m = nums1[top_index_m]
        top_element_n = nums2[top_index_n]

        if top_element_m > top_element_n:
            # copy over m to top, and decrement m index
            nums1[top_m_copy_to_index] = top_element_m
            top_index_m = top_index_m - 1
        else:
            # copy over n to top, and decrement n index
            nums1[top_m_copy_to_index] = top_element_n
            top_index_n = top_index_n - 1

        top_m_copy_to_index = top_m_copy_to_index - 1

    # Simple copy over for remaining elements
    while top_index_n >= 0:
        top_element_n = nums2[top_index_n]
        nums1[top_m_copy_to_index] = top_element_n
        top_index_n = top_index_n - 1
        top_m_copy_to_index = top_m_copy_to_index - 1


def test_merge_sorted_array():
    nums1 = [1, 2, 3, 0, 0, 0]
    nums2 = [2, 5, 6]
    m = 3
    n = 3
    expected = [1, 2, 2, 3, 5, 6]
    merge_sorted_arrays(nums1, m, nums2, n)
    assert expected == nums1


def test_merge_sorted_array_empty_right():
    nums1 = [1]
    nums2 = []
    m = 1
    n = 0
    expected = [1]
    merge_sorted_arrays(nums1, m, nums2, n)
    assert expected == nums1


def test_merge_sorted_array_empty_left():
    nums1 = [0]
    m = 0
    nums2 = [1]
    n = 1
    expected = [1]
    merge_sorted_arrays(nums1, m, nums2, n)
    assert expected == nums1
