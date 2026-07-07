# ── Builder stage ──
FROM python:3.12-slim AS builder

WORKDIR /app
RUN pip install --no-cache-dir poetry==1.8.3

# No crear virtualenv: el contenedor ya es un entorno aislado
ENV POETRY_NO_INTERACTION=1

RUN python -m venv /venv
ENV VIRTUAL_ENV=/venv
ENV PATH="/venv/bin:$PATH"

# --no-root: instala solo dependencias
# --only main: no te lleva dev-dependencies a la imagen
COPY pyproject.toml poetry.lock ./
RUN poetry install --no-root --only main --no-ansi

COPY src ./src

# Strip de símbolos debug en .so (torch, scipy, etc.)
RUN find /venv -name "*.so" -exec strip --strip-unneeded {} + 2>/dev/null || true

# Limpieza de cache/tests/metadata innecesaria
RUN find /venv -type d -name "__pycache__" -exec rm -rf {} + \
    && find /venv -type d \( -name "tests" -o -name "test" \) -exec rm -rf {} + \
    && find /venv -name "*.pyc" -delete

# ── Runtime stage ──
FROM python:3.12-slim AS runtime

WORKDIR /app

# Copiamos site-packages y binarios (uvicorn, etc) instalados en el builder
COPY --from=builder /venv /venv
COPY --from=builder /app/src ./src

ENV PATH="/venv/bin:$PATH"

EXPOSE 8080

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080"]
