from test.graphdraw import GraphDrawer, Graph


def my_draw_fib(n):

    gd = GraphDrawer(__file__)

    def recursive_fib(n, graph):

        g = Graph(name=n, parent=graph, gd=gd)
        g.add_variables({"n": n})
        gd.add_graph(g)
        gd.draw_all()

        if n <= 1:
            result = n
        else:
            fib_minus_1 = recursive_fib(n - 1, g)
            g.add_variables({"fib_minus_1": fib_minus_1})
            gd.draw_all()
            fib_minus_2 = recursive_fib(n - 2, g)
            g.add_variables({"fib_minus_2": fib_minus_2})
            gd.draw_all()
            result = fib_minus_1 + fib_minus_2

        g.add_variables({"result": result})
        gd.draw_all()

        g.remove()
        return result

    solution = recursive_fib(n, None)
    gd.done()
    return solution


def test_draw_fib():
    n = 3
    expected = 2
    actual = my_draw_fib(n)
    assert actual == expected
