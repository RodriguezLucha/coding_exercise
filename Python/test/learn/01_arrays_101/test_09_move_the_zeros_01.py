from test.graphdraw import GraphDrawer


def move_the_zeros(nums):
    gd = GraphDrawer(__file__)

    last_non_zero_found_at = 0
    i = 0

    # If the current element is not 0, then we need to
    # append it just in front of last non 0 element we found.
    def d():
        gd.draw(array=nums, indexes={"i": i, "last": last_non_zero_found_at})

    while i < len(nums):
        d()
        if nums[i] != 0:
            nums[last_non_zero_found_at] = nums[i]
            d()
            last_non_zero_found_at += 1
            d()
        i += 1

    #  	After we have finished processing new elements,
    #  	all the non-zero elements are already at beginning of array.
    #  	We just need to fill remaining array with 0's.
    def d():
        gd.draw(array=nums, indexes={"i": i})

    i = last_non_zero_found_at
    while i < len(nums):
        d()
        nums[i] = 0
        d()
        i += 1


def test_move_the_zeros_01():
    nums = [1, 0, 2, 0, 3, 0, 4, 5, 6, 0, 0, 0, 7, 8, 9, 0]
    expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0]
    # nums = [0, 1, 0, 3, 12]
    # expected = [1, 3, 12, 0, 0]
    move_the_zeros(nums)
    assert nums == expected
