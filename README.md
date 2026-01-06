# KEYFINDER

Página web que permite cargar un archivo de audio y estimar la clave musical a la cual pertenece.

## Objetivos

Desarrollar una página web que permite cargar un archivo de audio y estimar la tonalidad musical a través de un modelo de Aprendizaje de Máquinas, servido mediante una API.

## Organización del proyecto

Para simplicidad del desarrollo, este proyecto contiene tanto el backend como el frontend dentro del mismo proyecto.

### Backend

| Carpeta | Contenido | Propósito |
| :--- | :--- | :--- |
| **`app/`** | Código Python (`.py`) | Núcleo del proyecto, se encarga del procesamiento de audio, validación de peticiones entrantes y carga del modelo de ML |
| **`temp/`** | Audios (`.wav / .mp3 / .ogg`) | Carpeta temporal donde se guardan los datos a realizar inferencia |
| **`tests/`** | Audios (`.wav / .mp3 / .ogg`) | Datos de pruebas para validar la API |
| **`main.py`** | Código Python (`.py`) | Punto de entrada, define el funcionamiento de la API |

### Frontend

| Carpeta | Contenido | Propósito |
| :--- | :--- | :--- |
| **`src/`** | Código JSX (`.jsx`), Estilos (`.css`) | Punto de entrada, se cargan los estilos de TailwindCSS y se define donde se cargan los modulos de la app |
| **`src/app/`** | Código JSX (`.jsx`) | Núcleo del proyecto, se encarga de la validación de audios y envío a la API, también actualiza los resultados en pantalla |
| **`src/icons/`** | Iconos (`.svg`) | Otorgar identidad visual a ciertos elementos del proyecto |
| **`public/`** | Iconos (`.svg`) | Archivos públicos del proyecto |
| **`index.html`** | Código HTML (`.html`) | Se define la estructura base de la página web |

## Tecnologías utilizadas

Frontend:
- Javascript
- Solid
- TailwindCSS
- Vite

Backend:
- Python
- FastAPI
- Torch
- Soundfile, Librosa, Numpy

## Licencia

Este proyecto utiliza las siguientes licencias:
- KeyR2Net: [Creative Commons Attribution-NonCommercial 4.0 International License][cc-by-nc]. Ver https://github.com/RainingDaemons/keyr2net para más información.
- Todos los demás scripts: MIT License.

[cc-by-nc]: https://creativecommons.org/licenses/by-nc/4.0/
