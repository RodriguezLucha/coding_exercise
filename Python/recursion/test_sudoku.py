import copy


class Solution:
    def is_solution(self):
        for row in range(len(self.grid)):
            for col in range(len(self.grid)):
                if self.grid[row][col] == ".":
                    return False
        return True

    def solution_found(self):
        self.result = copy.deepcopy(self.grid)
        return

    def list_of_candidates(self):
        empty_square = None

        for row in range(len(self.grid)):
            for col in range(len(self.grid)):
                if self.grid[row][col] == ".":
                    empty_square = [row, col]
                    break

        candidates = []
        if empty_square:
            for num in ["1", "2", "3", "4", "5", "6", "7", "8", "9"]:
                candidates.append([empty_square[0], empty_square[1], num])

        return candidates

    def is_valid(self, candidate):
        [row, col, char] = candidate
        if self.grid[row][col] != ".":
            return False

        for i in range(len(self.grid)):
            if self.grid[i][col] == char:
                return False

        for i in range(len(self.grid)):
            if self.grid[row][i] == char:
                return False

        def start_number(num):
            return num - num % 3

        [start_row, start_col] = [start_number(row), start_number(col)]
        for r in range(start_row, start_row + 3):
            for c in range(start_col, start_col + 3):
                if self.grid[r][c] == char:
                    return False

        return True

    def place(self, candidate):
        [row, col, char] = candidate
        self.grid[row][col] = char

    def remove(self, candidate):
        [row, col, char] = candidate
        self.grid[row][col] = "."

    def backtrack(self):
        if self.is_solution():
            self.solution_found()
            return

        for candidate in self.list_of_candidates():
            if self.is_valid(candidate):
                self.place(candidate)
                self.backtrack()
                self.remove(candidate)

    def sudoku_solve(self, grid):
        self.result = []
        self.grid = grid
        self.backtrack()
        return self.result


def test_sudoku_solver():
    input = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ]

    expected = [
        ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
        ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
        ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
        ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
        ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
        ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
        ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
        ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
        ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
    ]

    actual = Solution().sudoku_solve(input)
    assert actual == expected
