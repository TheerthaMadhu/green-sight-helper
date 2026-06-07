# 🌿 Plant Disease Detection System

An AI-powered web application that detects plant diseases from leaf images using Deep Learning and Computer Vision. Users can upload a plant leaf image and receive the predicted disease along with a confidence score.

---

## 📌 Project Overview

Plant diseases can significantly reduce crop yield and quality. Early disease detection helps farmers take preventive measures and improve agricultural productivity.

This project uses a trained Convolutional Neural Network (CNN) / MobileNetV2 model to identify diseases from plant leaf images and display the results through a Flask-based web application.

---

## 🚀 Features

- Upload plant leaf images
- AI-based disease detection
- Confidence score display
- User-friendly web interface
- Fast prediction using TensorFlow/Keras
- Supports multiple plant diseases
- Responsive design using Bootstrap

---

## 🛠️ Technology Stack

### Frontend
- HTML5
- CSS3
- Bootstrap 5

### Backend
- Python
- Flask

### Machine Learning
- TensorFlow
- Keras
- MobileNetV2

### Image Processing
- NumPy
- Pillow

---

## 📂 Project Structure

plant-disease-detector/

├── app.py

├── train.py

├── requirements.txt

├── README.md

│

├── model/

│ └── plant_model.h5

│

├── static/

│ ├── css/

│ │ └── style.css

│ │

│ └── uploads/

│

├── templates/

│ ├── index.html

│ └── result.html

│

└── dataset/

---

## 📊 Dataset

This project uses the PlantVillage Dataset.

Example Classes:

- Tomato Healthy
- Tomato Early Blight
- Tomato Late Blight
- Potato Healthy
- Potato Early Blight
- Potato Late Blight
- Pepper Healthy
- Pepper Bacterial Spot

Image Size:

224 × 224 pixels

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/plant-disease-detector.git

cd plant-disease-detector
