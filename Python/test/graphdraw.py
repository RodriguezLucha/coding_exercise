import os
import shutil
from pprint import pprint
from typing import Counter
from graphviz import Digraph
import graphviz


class GraphDrawer:
    def __init__(self, callers__filename__):
        self.make_directory(callers__filename__)
        self.counter = 0

    def make_directory(self, callers__filename__):
        head, tail = os.path.split(callers__filename__)
        root = os.path.splitext(tail)[0]
        dir = head + os.path.sep + root
        shutil.rmtree(dir, ignore_errors=True, onerror=None)
        os.mkdir(dir)
        self.dir = dir

    def draw(self, array, indexes):
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
        filename = self.dir + os.path.sep + str(self.counter) + ".gv"
        self.counter += 1
        graph.format = "svg"
        graph.filename = filename
        graph.render()
        file = open(filename, "w")
        file.write(graph.source)
        file.close

    def make_html(self):

        html_filename = self.dir + os.path.sep + "index.html"
        list_string = ",".join([f"'./{i}.gv.svg'" for i in range(self.counter)])

        html_content = (
            """
            <!DOCTYPE html>
                <html>
                  <body>
                    <h3 id="image_name">./0.gv.svg</h3>
                    <div class="container">
                      <div id="slideshow">
                        <img src="./0.gv.svg" id="imgClickAndChange" onclick="changeImage()" />
                      </div>
                    </div>
                    <script>
                      var images_array = ["""
            + list_string
            + """]
                      var index = 0

                      function changeImage (dir) {
                        var image_element = document.getElementById('imgClickAndChange')

                        if (index + dir >= images_array.length) {
                          index = 0
                        } else if (index + dir < 0) {
                          index = images_array.length - 1
                        } else {
                          index = index + dir
                        }

                        image_element.src = images_array[index]

                        var image_name = document.getElementById('image_name')
                        image_name.innerHTML = images_array[index]
                      }

                      document.onkeydown = function (e) {
                        e = e || window.event
                        if (e.keyCode == '37') {
                          changeImage(-1)
                        } else if (e.keyCode == '39') {
                          changeImage(1)
                        }
                      }
                    </script>
                  </body>
                </html>
            """
        )
        file = open(html_filename, "w")
        file.write(html_content)
        file.close


# graph = Digraph(node_attr={"shape": "square"})
#     for letter in ["1", "2", "3", "4"]:
#         graph.node(letter)
#         filename = "test.gv"

#     graph.node("L", shape="circle")
#     graph.node("R", shape="circle")
#     graph.edge("L", "1")
#     graph.edge("R", "4")

#     grouping = Digraph(name=None, comment=None, graph_attr={"rank": "same"})
#     grouping.node("1")
#     grouping.node("2")
#     grouping.node("3")
#     grouping.node("4")

#     graph.subgraph(grouping)

#     f = open(filename, "w")
#     print(graph.source)
#     f.write(graph.source)
#     f.close()


# digraph {
# 	node [shape=square]
# 	0
# 	1
# 	2
# 	3
# 	node [shape=circle]
# 	L -> 0
# 	R -> 3
# 	{rank = same; 0; 1; 2; 3;}
# }
