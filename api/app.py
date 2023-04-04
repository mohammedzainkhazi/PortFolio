import cv2
import time 
from utils.models import load_model
import torch
import torchvision.transforms as transforms
from utils.transforms import Resize, DEFAULT_TRANSFORMS
from utils.utils import  rescale_boxes, non_max_suppression
from utils.box import *
import random
import numpy as np
from pathlib import Path
# cv2.namedWindow('window_name', cv2.WINDOW_NORMAL |
#                 cv2.WINDOW_KEEPRATIO | cv2.WINDOW_GUI_EXPANDED)

# Download the model from 'https://drive.google.com/file/d/1yt1-zOy7oAb04hsCbWGL__BM8cV1rhRI/view?usp=share_link' and place it in model folder

model = load_model('/home/santhosh/Desktop/finalYearProject/api/config/custom.cfg',
                   '/home/santhosh/Desktop/finalYearProject/api/model/hfrs.pth')

kernel = np.array([[0, -1, 0],
                   [-1, 5,-1],
                   [0, -1, 0]])

def detect_image(model, image, img_size=640, conf_thres=0.5, nms_thres=0.5):
    model.eval() 
    input_img = transforms.Compose([
        DEFAULT_TRANSFORMS,
        Resize(img_size)])(
            (image, np.zeros((1, 5))))[0].unsqueeze(0)
    if torch.cuda.is_available():
        input_img = input_img.to("cuda")
    with torch.no_grad():
        start=time.time()
        detections = model(input_img)
        print(time.time()-start)
        detections = non_max_suppression(detections, conf_thres, nms_thres)
        detections = rescale_boxes(detections[0], img_size, image.shape[:2])
    return detections.numpy()



def plot_one_box(x, im,  line_thickness=2, gain=2, pad=20):
    assert im.data.contiguous, 'Image not contiguous. Apply np.ascontiguousarray(im) to plot_on_box() input image.'
    
    c1, c2 = (int(x[0])-10, int(x[1])-10), (int(x[2])+10, int(x[3])+10)
    cv2.rectangle(im, c1, c2, (255,255,0), thickness=line_thickness, lineType=cv2.LINE_AA)

def save_one_box(xyxy, im,c=0,fc=0, gain=1, pad=20, square=False, RGB=True,):
    xyxy = torch.tensor(xyxy).view(-1, 4)
    b = xyxy2xywh(xyxy)  # boxes
    if square:
        b[:, 2:] = b[:, 2:].max(1)[0].unsqueeze(1)
    b[:, 2:] = b[:, 2:] * gain + pad
    xyxy = xywh2xyxy(b).long()
    clip_coords(xyxy, im.shape)
    #This is the cropped face
    crop = im[int(xyxy[0, 1]):int(xyxy[0, 3]), int(xyxy[0, 0]):int(xyxy[0, 2])]

    #Start Face recognition from the cropped face here 



    #code for saving thr cropped face 
    cv2.imwrite(str('crop/frame_'+str(fc)+'_face_'+str(c)+'.jpg'), crop if RGB else crop[..., ::-1])


def start_processing(video_path=None):
    if(video_path):
        cap = cv2.VideoCapture(video_path)
    else:
        cap = cv2.VideoCapture(0)
    fc = 0

    while(True):
        has_frame, frame = cap.read()
        if not has_frame:
            print('[i] ==> Done processing!!!')
            cv2.waitKey(1000)
            break

        #/////////////////////////////////////////
        # scale_percent = 200  # Increase by 200%
        # width = int(frame.shape[1] * scale_percent / 100)
        # height = int(frame.shape[0] * scale_percent / 100)
        # frame = cv2.resize(frame, (width, height))
        #/////////////////////////////////////////////

        frame = cv2.filter2D(src=frame, ddepth=-1, kernel=kernel)

        detections = detect_image(model,frame)
        fc=fc+1
        c=0
        for _, (*xyxy, _, _) in enumerate(reversed(detections)):
            save_one_box(xyxy=xyxy,im=frame,c=c,fc=fc,gain=1,pad=5,square=True)
            c=c+1
            plot_one_box(xyxy, frame)        

        cv2.imshow('CCTV',frame)
        cv2.waitKey(1)

        if(len(detections)!=0):
            cv2.imwrite(str('frames/frame_'+str(fc)+'.jpg'), frame)
    


if __name__== '__main__':
    # give path of the video file if not video_path=r'E:\Major_Project\Datasets_zip\Normal_Videos_for_Event_Recognition\Normal_Videos_for_Event_Recognition\Normal_Videos_758_x264.mp4'
    start_processing(
        video_path=r'/home/santhosh/Desktop/Major Project/Dataset/Anomaly-Videos-Part-1/Abuse/Abuse036_x264.mp4')
