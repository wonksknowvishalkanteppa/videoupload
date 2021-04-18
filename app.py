from flask import Flask, jsonify, request, render_template

app = Flask(__name__)
app.debug = True


@app.route("/")
def choice():
    return render_template("main.html")


@app.route("/file", methods=["POST", "GET"])
def file():
    if request.method == "GET":
        return render_template("file.html")
    else:
        f = request.files["file"]
        del f
        return jsonify({"message": "succesfully uploaded"})


@app.route("/video", methods=["GET", "POST"])
def video():
    if request.method == "GET":
        return render_template("video.html")
    else:
        x = 1


if __name__ == "__main__":
    app.run()
