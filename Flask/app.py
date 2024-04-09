from flask import Flask, send_file, jsonify
import os   
import librosa
import numpy as np
from firebase_admin import credentials, storage, initialize_app
import cv2
from io import BytesIO
from main import count_mosquitoes
from flask_cors import CORS

# Initialize Firebase with the credentials and specify the storage bucket
cred = credentials.Certificate('csml.json')
firebase_app = initialize_app(cred, {'storageBucket': 'csml-b322f.appspot.com'})

# Get a reference to the Firebase Storage bucket
bucket = storage.bucket(app=firebase_app)

app = Flask(__name__)
CORS(app)

# Function to load audio file and return audio data and sample rate
def load_audio(file_path, sr=None):
    audio, sr = librosa.load(file_path, sr=sr)
    return audio, sr

# Function to extract MFCC features from audio
def extract_mfcc(audio, sr):
    mfcc = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13) 
    return mfcc

# Function to preprocess MFCC features
def preprocess_mfcc(mfcc1, mfcc2):
    min_len = min(mfcc1.shape[1], mfcc2.shape[1])
    mfcc1 = mfcc1[:, :min_len]
    mfcc2 = mfcc2[:, :min_len]
    return mfcc1, mfcc2

# Function to calculate matching percentage between two sets of MFCC features
def calculate_matching_percentage(mfcc1, mfcc2):
    matching_coeffs = np.sum(np.isclose(mfcc1, mfcc2, atol=1e-8))
    total_coeffs = mfcc1.size
    matching_percentage = (matching_coeffs / total_coeffs) * 100
    return matching_percentage

# Function to save image data to a temporary file
def save_image_temporarily(image_data):
    temp_file_path = 'temp_image.jpg'  # Temporary file path
    with open(temp_file_path, 'wb') as f:
        f.write(image_data)
    return temp_file_path

# Image analysis endpoint
@app.route('/analyze-mosquitoes/<image>')
def analyze_mosquitoes(image):
    try:
        # Get the image file from Firebase Storage
        image_blob = bucket.blob(f'images/{image}.jpg')  # Adjust the path if needed
        image_data = image_blob.download_as_bytes()

        # Save image data to a temporary file
        temp_image_path = save_image_temporarily(image_data)

        # Process the image using the count_mosquitoes function
        processed_image = count_mosquitoes(temp_image_path, area_multiplier=1.5)

        # Encode the processed image as JPEG
        _, img_encoded = cv2.imencode('.jpg', processed_image)
        
        # Create an in-memory file-like object to hold the image data
        img_io = BytesIO(img_encoded)

        # Return the image data as a Flask response
        return send_file(
            img_io,
            mimetype='image/jpeg'
        )
    except Exception as e:
        return str(e), 500

# Audio analysis endpoint
@app.route('/analyze-audio/<audio>')
def analyze_audio(audio):
    try:
        # Define the path to the new audio file
        main_folder = r'F:\CSML\Flask\mosquito_type_detection\audio_processing\audio_dataset'
        new_audio_file = os.path.join(r'F:\CSML\Flask\mosquito_type_detection\audio_processing', 'sample', f'{audio}.wav')
        new_audio, sr_new = load_audio(new_audio_file)
        mfcc_new = extract_mfcc(new_audio, sr_new)

        matching_results = []

        # Loop through the reference audio files
        for folder_name in os.listdir(main_folder):
            folder_path = os.path.join(main_folder, folder_name)
            if os.path.isdir(folder_path):
                for file_name in os.listdir(folder_path):
                    if file_name.endswith('.wav'):
                        file_path = os.path.join(folder_path, file_name)
                        reference_audio, sr_ref = load_audio(file_path)
                        mfcc_ref = extract_mfcc(reference_audio, sr_ref)

                        mfcc_new, mfcc_ref = preprocess_mfcc(mfcc_new, mfcc_ref)

                        matching_percentage = calculate_matching_percentage(mfcc_new, mfcc_ref)

                        if matching_percentage >= 80.0:
                            matching_results.append({
                                'folder_name': folder_name,
                                'matching_percentage': matching_percentage
                            })

        if matching_results:
            return jsonify({
                'success': True,
                'data': matching_results
            })
        else:
            return jsonify({"message": "No matches found."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
