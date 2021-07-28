from test.graphdraw import GraphDrawer


def my_generate_parenthesis(n):
    gd = GraphDrawer(__file__)
    ans = []

    def backtrack(S=[], left=0, right=0):
        def d():
            gd.draw(array=S)

        d()
        if len(S) == 2 * n:
            ans.append("".join(S))
            return
        if left < n:
            S.append("(")
            backtrack(S, left + 1, right)
            S.pop()
        if right < left:
            S.append(")")
            backtrack(S, left, right + 1)
            S.pop()

    backtrack()
    return ans


def test_generate_valid_parenthesis():
    n = 3
    expected = ["((()))", "(()())", "(())()", "()(())", "()()()"]
    actual = my_generate_parenthesis(n)
    assert actual == expected
