"""
@Author       : Felipe Gutiérrez Carilao
@Website      : https://www.rainingdaemons.com/
@Module       : backend.src.utils
@File         : validator.py
"""

import os
import soundfile as sf
from fastapi import HTTPException

MAX_MB = 10
MAX_DURATION = 10

@staticmethod
async def validate(file, path):
    try:
        # Check file extension
        if not file.filename.endswith(('.wav', '.mp3', '.ogg')):
            raise HTTPException(status_code=404, detail="Unsupported filetype")
        
        # Check magic bytes
        with open(path, "rb") as f:
            header = f.read(12)

        if not ((header[0:4] == b"RIFF" and header[8:12] == b"WAVE") or (header[0] == 0xFF and (header[1] & 0xE0) == 0xE0) or (header[0:3] == b"ID3") or (header[0:4] == b"OggS")):
            raise HTTPException(status_code=404, detail="Unsupported filetype")

        # Check file size
        size_mb = os.path.getsize(path) / (1024 * 1024)

        if size_mb > MAX_MB:
            raise HTTPException(status_code=400, detail="File too big (maximum 10 MB)")
        
        # Check audio length
        with sf.SoundFile(path) as audio:
            duration = len(audio) / audio.samplerate

        if duration < MAX_DURATION:
            raise HTTPException(status_code=400, detail="File too short (minimum 10 seconds)")

    except HTTPException:
        if os.path.exists(path):
            os.remove(path)
        raise

    except Exception:
        if os.path.exists(path):
            os.remove(path)
        
        raise HTTPException(status_code=500, detail="Could not process audio file")
