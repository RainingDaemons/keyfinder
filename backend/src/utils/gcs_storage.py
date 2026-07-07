"""
@Module : backend.utils
@File   : gcs_storage.py

Utilidades para almacenamiento temporal de audios subidos en Google Cloud Storage.
"""

import os
import uuid

from google.cloud import storage
from google.cloud.exceptions import NotFound

GCS_BUCKET = os.getenv("GCS_BUCKET")

_client = storage.Client()


def _bucket():
    return _client.bucket(GCS_BUCKET)


def upload_temp_audio(file_bytes: bytes, filename: str) -> str:
    """Sube el audio al bucket bajo una ruta única y devuelve el nombre del blob."""
    blob_name = f"temp-uploads/{uuid.uuid4()}_{filename}"
    blob = _bucket().blob(blob_name)
    blob.upload_from_string(file_bytes)
    return blob_name


def download_temp_audio(blob_name: str, local_path: str) -> None:
    """Descarga el blob temporal a una ruta local para su procesamiento."""
    blob = _bucket().blob(blob_name)
    blob.download_to_filename(local_path)


def delete_temp_audio(blob_name: str) -> None:
    """Elimina el blob temporal, ignorando si ya no existe."""
    try:
        _bucket().blob(blob_name).delete()
    except NotFound:
        pass