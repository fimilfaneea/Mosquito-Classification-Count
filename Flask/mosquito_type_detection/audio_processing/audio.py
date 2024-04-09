import os
import librosa
import numpy as np

def load_audio(file_path, sr=None):
    audio, sr = librosa.load(file_path, sr=sr)
    return audio, sr

def extract_mfcc(audio, sr):
    mfcc = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13) 
    return mfcc

def preprocess_mfcc(mfcc1, mfcc2):

    min_len = min(mfcc1.shape[1], mfcc2.shape[1])
    mfcc1 = mfcc1[:, :min_len]
    mfcc2 = mfcc2[:, :min_len]
    return mfcc1, mfcc2

def calculate_matching_percentage(mfcc1, mfcc2):

    matching_coeffs = np.sum(np.isclose(mfcc1, mfcc2, atol=1e-8))
    total_coeffs = mfcc1.size
    matching_percentage = (matching_coeffs / total_coeffs) * 100
    return matching_percentage

if __name__ == "__main__":
    new_audio_file = r"F:\CSML\Flask\mosquito_type_detection\audio_processing\audio_dataset\Aedes mediovittatus\Ae medi 3.wav"
    new_audio, sr_new = load_audio(new_audio_file)
    mfcc_new = extract_mfcc(new_audio, sr_new)

    main_folder = r"F:\CSML\Flask\mosquito_type_detection\audio_processing\sample"

    matching_results = []

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
                        matching_results.append((folder_name, file_name, matching_percentage))

    if matching_results:
        print("Matching results:")
        for folder_name, file_name, matching_percentage in matching_results:
            print(f"'{folder_name}'")
    else:
        print("No matches found.")
