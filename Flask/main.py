import cv2

def count_mosquitoes(image_path, area_multiplier=1):
    img = cv2.imread(image_path)
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    binary_img = cv2.adaptiveThreshold(gray_img, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 11, 5)
    contours, _ = cv2.findContours(binary_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    mosquito_count = 0
    for cnt in contours:
        area = cv2.contourArea(cnt)
        x, y, w, h = cv2.boundingRect(cnt)
        aspect_ratio = float(w) / h
        
        if area > 100 * area_multiplier and aspect_ratio < 3:
            cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)
            mosquito_count += 1
                
    cv2.putText(img, f"Count: {mosquito_count}", (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    return img  # Return the processed image as a NumPy array
