"""
@Author       : Felipe Gutiérrez
@Website      : https://www.rainingdaemons.com
@Module       : backend.src
@File         : main.py
"""

import os
import tempfile
from pathlib import Path

import torch
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from src.utils.validator import validate
from src.utils.model_loader import load_model
from src.utils.audio_processing import AudioProcessor
from src.utils.gcs_storage import upload_temp_audio, download_temp_audio, delete_temp_audio
from src.utils.rate_limiter import RateLimitMiddleware

# .env está en la raíz del repo (dos niveles arriba)
ROOT_DIR = Path(__file__).resolve().parents[2]
load_dotenv(ROOT_DIR / ".env")

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

app.add_middleware(RateLimitMiddleware, max_requests=10, window_seconds=60)

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    file_bytes = await file.read()

    blob_name = upload_temp_audio(file_bytes)

    suffix = os.path.splitext(file.filename)[1]
    local_path = tempfile.NamedTemporaryFile(suffix=suffix, delete=False).name

    try:
        download_temp_audio(blob_name, local_path)

        await validate(file, local_path)

        x = processor.process(local_path)

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
        raise HTTPException(status_code=500, detail="Could not process audio file")

    finally:
        if os.path.exists(local_path):
            os.remove(local_path)
        delete_temp_audio(blob_name)
