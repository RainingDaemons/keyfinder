"""
@Date         : 06-01-2026
@Author       : Felipe Gutiérrez Carilao
@Website      : https://www.rainingdaemons.com/
@Module       : backend
@File         : main.py
"""

import os
import torch
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from src.utils.validator import validate
from src.utils.model_loader import load_model
from src.utils.audio_processing import AudioProcessor

load_dotenv()

FRONT_URL = os.getenv("FRONT_URL")
ENV = os.getenv("ENV")

if ENV == "production":
    docs_url = None
else:
    docs_url = "/docs"

app = FastAPI(docs_url=docs_url)

model = load_model()
processor = AudioProcessor()
real_labels = ['A#:major', 'A#:minor', 'A:major', 'A:minor',
    'B:major', 'B:minor', 'C#:major', 'C#:minor',
    'C:major', 'C:minor', 'D#:major', 'D#:minor',
    'D:major', 'D:minor', 'E:major', 'E:minor',
    'F#:major', 'F#:minor', 'F:major', 'F:minor',
    'G#:major', 'G#:minor', 'G:major', 'G:minor']

origins = (
    [FRONT_URL]
    if ENV == "production"
    else ["http://localhost:3000"]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    temp_dir = "temp"
    os.makedirs(temp_dir, exist_ok=True)

    temp_path = os.path.join(temp_dir, file.filename)

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    await validate(file, temp_path)

    try:
        x = processor.process(temp_path)

        with torch.no_grad():
            logits = model(x)
            probs = torch.softmax(logits, dim=1)

            pred_class = torch.argmax(probs, dim=1).item()
            confidence = probs.max(dim=1).values.item()

        return {
            "class": real_labels[pred_class],
            "confidence": round(confidence, 3)
        }
    
    except Exception:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        
        raise HTTPException(status_code=500, detail="Could not process audio file")

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)
