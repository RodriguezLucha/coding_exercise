def make_html(list_string):
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
    return html_content
