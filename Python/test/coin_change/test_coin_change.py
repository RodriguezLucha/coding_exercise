import sys


class Solution:
    def coinChange(self, coins, amount):

        self.cache = [0] * (amount + 1)
        self.coins = coins

        def solve(amount):
            if amount < 0:
                return sys.maxsize
            if amount == 0:
                return 0
            if self.cache[amount] != 0:
                return self.cache[amount]
            my_min = sys.maxsize
            for denomination in self.coins:
                temp = solve(amount - denomination)
                if temp != sys.maxsize:
                    my_min = min(my_min, 1 + temp)
            self.cache[amount] = my_min
            return self.cache[amount]

        res = solve(amount)

        if res == sys.maxsize:
            return -1

        return res


def test_basic_coin_change():
    actual = Solution().coinChange([1, 2, 5], 100)
    expected = 20
    assert actual == expected

    actual = Solution().coinChange([1, 2, 5], 4)
    expected = 2
    assert actual == expected

    actual = Solution().coinChange([2, 5], 3)
    expected = -1
    assert actual == expected
