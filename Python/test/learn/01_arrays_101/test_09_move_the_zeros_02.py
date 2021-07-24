from test.graphdraw import GraphDrawer

# void moveZeroes(vector<int>& nums) {
#     for (int lastNonZeroFoundAt = 0, cur = 0; cur < nums.size(); cur++) {
#         if (nums[cur] != 0) {
#             swap(nums[lastNonZeroFoundAt++], nums[cur]);
#         }
#     }
# }


def move_the_zeros(nums):
    gd = GraphDrawer(__file__)

    last_non_zero_found_at = 0
    current = 0

    def d():
        gd.draw(
            array=nums, indexes={"current": current, "last": last_non_zero_found_at}
        )

    while current < len(nums):
        d()
        if nums[current] != 0:
            # if (nums[cur] != 0) {
            #     swap(nums[lastNonZeroFoundAt++], nums[cur]);
            temp = nums[last_non_zero_found_at]
            nums[last_non_zero_found_at] = nums[current]
            nums[current] = temp
            d()
            last_non_zero_found_at += 1
            d()

        current += 1


def test_move_the_zeros_02():
    nums = [1, 0, 2, 0, 3, 0, 4, 5, 6, 0, 0, 0, 7, 8, 9, 0]
    expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0]
    # nums = [0, 1, 0, 3, 12]
    # expected = [1, 3, 12, 0, 0]
    move_the_zeros(nums)
    assert nums == expected
