
from flask import Flask, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
class Tweet(Flask):
    def __init__(params):
        pass
    @app.route("/data",methods=["POST","GET"])
    def data():
        print("post rqst")
        data = request.get_json()  
        print(data)
        return {"hi": data}



@app.route('/upload', methods=['POST'])
def upload_file():
    files = request.files.getlist('videos')
    for file in files:
        file.save(file.filename)
        # Process each file here
    return 'Videos uploaded successfully'

@app.route('/uploadImage', methods=['POST'])
def upload_image():
    files = request.files.getlist('criminalImage')
    files[0].save(files[0].filename)
        # Process each file here
    return 'Image uploaded successfully'


if __name__ == '__main__':
    app.run(debug=True,port=5000)


# future idea
# filters like specific duration,location,specific user tweets etc