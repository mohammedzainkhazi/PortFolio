from flask import Flask, request
from flask_cors import CORS
import app
from app import start_processing
from face_rec import criminal_feature

app = Flask(__name__)
CORS(app)
class FileUpload(Flask):
    def __init__(params):
        pass
    @app.route("/data",methods=["POST","GET"])
    def data():
        data = request.get_json()  
        print(data)
        start_processing(data["video_url"])
        criminal_feature(data["img_url"])
        return {"result":"hello"}
        
# @app.route('/upload', methods=['POST'])
# def upload_file():
#     files = request.files.getlist('videos')
#     for file in files:
#         file.save("../"+file.filename)
#         print(type(file.filename))
        # Process each file here
#     return "Video uploaded successfully"  

# @app.route('/uploadImage', methods=['POST'])
# def upload_image():
#     files = request.files.getlist('criminalImage')
#     files[0].save(files[0].filename)
        # Process each file here
#     return 'Image uploaded successfully'

if __name__ == '__main__':
    app.run(debug=True,port=5000)
