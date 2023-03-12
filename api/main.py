
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
        # data = "hello"
        return {"hi": data}



@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    file.save(file.filename)
    # Process the file here
    return 'File uploaded successfully'


if __name__ == '__main__':
    app.run(debug=True,port=5000)


# future idea
# filters like specific duration,location,specific user tweets etc