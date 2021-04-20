from flask import Flask, jsonify, request, render_template
import os
import json
import boto3

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


@app.route("/s3_signature", methods=["POST"])
def s3_signature():
    S3_BUCKET = os.environ.get('S3_BUCKET')

    S3_BUCKET="vishalk12"
    file_name = request.form['fname']
    file_type = request.form['ftype']

    s3 = boto3.client("s3")
    presigned_post = s3.generate_presigned_post(
        Bucket=S3_BUCKET,
        Key=file_name,
        Fields={"acl": "public-read", "Content-Type": file_type},
        Conditions=[
            {"acl": "public-read"},
            {"Content-Type": file_type}
        ],
        ExpiresIn=3600
    )

    return json.dumps({
        'data': presigned_post,
        'url': 'https://%s.s3.amazonaws.com/%s' % (S3_BUCKET, file_name)
    })


if __name__ == "__main__":
    app.run()
