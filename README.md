# KEYFINDER

Página web que permite cargar un archivo de audio y estimar la clave musical a la cual pertenece.

# Ejecutar proyecto

## Backend

Previamente tener descargado Poetry en tu sistema operativo, luego ejecutar:
```bash
poetry install
poetry run uvicorn src.main:app --reload --port 8080
```

## Frontend

Se recomienda tener instalado PNPM, luego ejecutar:
```bash
pnpm install
pnpm dev
```

## Infraestructura

Se recomienda tener instalado Opentofu, luego ejecutar:
```bash
tofu init
# visualizar cambios realizados en infra
tofu plan
# aplicar cambios en infra
tofu apply
```

# Tecnologías utilizadas

Frontend:
- Node.js
- PNPM
- Javascript
- Solid.js
- TailwindCSS

Backend:
- Python 3.12+
- Poetry
- FastAPI
- PyTorch

Para manejar la infraestructura se utiliza la solución de IaC llamada [Opentofu](https://opentofu.org/docs/).

## Licencia

Este proyecto utiliza las siguientes licencias:
- KeyR2Net: [Creative Commons Attribution-NonCommercial 4.0 International License][cc-by-nc]. Ver https://github.com/RainingDaemons/keyr2net para más información.
- Todos los demás scripts: MIT License.

[cc-by-nc]: https://creativecommons.org/licenses/by-nc/4.0/
