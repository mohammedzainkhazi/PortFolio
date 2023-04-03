import cv2
import face_recognition
import os
from os import listdir

criminal_encoding = []
def criminal_feature(path):
    img2 = cv2.imread(
        "/home/santhosh/Desktop/finalYearProject/api/images/original.png")
    rgb_img = cv2.cvtColor(img2, cv2.COLOR_BGR2RGB)
    global criminal_encoding
    criminal_encoding = face_recognition.face_encodings(rgb_img)[0]
criminal_feature("smtg")
folder_dir = "/home/santhosh/Desktop/finalYearProject/api/crop"
for image in os.listdir(folder_dir):
    img = cv2.imread(
        f"/home/santhosh/Desktop/finalYearProject/api/crop/{image}")
    rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    unknown_encoding = face_recognition.face_encodings(rgb_img)
    if len(unknown_encoding)!=0:
        unknown_encoding = unknown_encoding[0]
    else:
        print("No Face found")
        continue
    result = face_recognition.compare_faces([unknown_encoding], criminal_encoding)
    
    if result[0]:    
        print("Match found")   
        print(image)
    else:    
        print("Not a Match!")    