#!/usr/bin/env python3
"""
Model Conversion & Export Utility
Converts trained CropDoctor .keras / SavedModel weights into:
1. TensorFlow Lite (.tflite) for edge Android deployment
2. TensorFlow.js web model directory for in-browser client inference
"""

import os
import tensorflow as tf

MODEL_PATH = "./models/cropdoctor_cnn.keras"
TFLITE_PATH = "./models/cropdoctor_model.tflite"

def export_tflite():
    if not os.path.exists(MODEL_PATH):
        print(f"[ERROR] Trained model not found at {MODEL_PATH}")
        return

    print("[INFO] Converting to TensorFlow Lite format with float16 quantization...")
    model = tf.keras.models.load_model(MODEL_PATH)
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    converter.target_spec.supported_types = [tf.float16]
    
    tflite_model = converter.convert()

    with open(TFLITE_PATH, "wb") as f:
        f.write(tflite_model)
    
    size_mb = os.path.getsize(TFLITE_PATH) / (1024 * 1024)
    print(f"[SUCCESS] Exported TFLite model to {TFLITE_PATH} ({size_mb:.2f} MB)")

if __name__ == "__main__":
    export_tflite()
