from test.graphdraw import GraphDrawer, Graph


def my_draw_fib(n):

    gd = GraphDrawer(__file__)

    def recursive_fib(n, graph):

        g = Graph(name=n, parent=graph)
        g.add_variables({"n": n})
        gd.add_graph(g)
        gd.draw_all()

        if n <= 1:
            return n

        result = recursive_fib(n - 1, g) + recursive_fib(n - 2, g)

        g.add_variables({"result": result})
        g.remove()
        gd.draw_all()

        return result

    solution = recursive_fib(n, None)
    gd.done()
    return solution


def test_draw_fib():
    n = 4
    expected = 3
    actual = my_draw_fib(n)
    assert actual == expected
