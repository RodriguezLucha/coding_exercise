import os
import shutil
from graphviz import Digraph
from test.html_string import make_html


class GraphDrawer:
    def __init__(self, callers__filename__):
        self.make_directory(callers__filename__)
        self.graph_counter = 0
        self.node_counter = 0
        self.variables = {}
        self.graphs = []

    def add_variables(self, variables):
        for key, value in variables.items():
            self.variables[key] = value

    def make_directory(self, callers__filename__):
        head, tail = os.path.split(callers__filename__)
        root = os.path.splitext(tail)[0]
        dir = head + os.path.sep + root
        shutil.rmtree(dir, ignore_errors=True, onerror=None)
        os.mkdir(dir)
        self.dir = dir

    def draw(self, array, indexes={}):
        graph = Digraph(node_attr={"shape": "square"})
        grouping = Digraph(graph_attr={"rank": "same"})

        for i in range(len(array)):
            graph.node(name=str(i), label=str(array[i]))
            grouping.node(name=str(i))

        graph.subgraph(grouping)

        for key, value in indexes.items():
            graph.node(key, shape="circle")
            graph.edge(key, str(value))

        self.make_diagram(graph)
        self.make_html()

    def make_diagram(self, graph):
        filename = self.dir + os.path.sep + str(self.graph_counter) + ".gv"
        self.graph_counter += 1
        graph.format = "svg"
        graph.filename = filename
        graph.render()
        file = open(filename, "w")
        file.write(graph.source)
        file.close

    def make_html(self):

        html_filename = self.dir + os.path.sep + "index.html"
        self.html_filename = html_filename
        list_string = ",".join([f"'./{i}.gv.svg'" for i in range(self.graph_counter)])

        html_content = make_html(list_string)
        file = open(html_filename, "w")
        file.write(html_content)
        file.close

    def print_filename(self):
        print(self.html_filename)

    def add_graph(self, graph):
        graph.name = "_" + str(graph.name) + "_" + str(self.graph_counter)
        self.graphs.append(graph)

    def get_node_count(self):
        return self.node_counter

    def increment_node_count(self):
        self.node_counter += 1

    def draw_all(self):

        root_graph = Digraph(
            name="root",
            graph_attr={"compound": "true"},
        )

        # self.graphs = [g for g in self.graphs if g.active]

        for graph in self.graphs:
            subgraph_name = "cluster_" + str(graph.name)
            graph_attributes = {
                "label": "",
            }
            if not graph.active:
                graph_attributes["style"] = "filled"
                graph_attributes["color"] = "lightgrey"

            subgraph = Digraph(
                graph_attr=graph_attributes,
                name=subgraph_name,
            )
            subgraph.node(style="invisible", name=subgraph_name)
            parent_graph = graph.parent
            if parent_graph:
                parent_graph_name = "cluster_" + str(parent_graph.name)
                subgraph.edge(parent_graph_name, subgraph_name)

            for key, value in graph.variables.items():
                label = str(f"{key}:{value}")
                unique_name = f"{self.node_counter}_{label}"
                self.node_counter += 1
                subgraph.node(name=unique_name, label=label)

            root_graph.subgraph(subgraph)

        self.make_diagram(root_graph)

    def done(self):
        self.make_html()


class Graph:
    def __init__(self, name, parent, gd):
        self.name = name
        self.parent = parent
        self.variables = {}
        self.active = True
        self.gd = gd

    def add_variables(self, variables):
        for key, value in variables.items():
            self.variables[key] = value

    def remove(self):
        self.active = False
