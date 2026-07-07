# Cargar variables desde el .env en la raíz del proyecto
$envPath = Join-Path $PSScriptRoot "..\.env"

Get-Content $envPath | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)\s*=\s*(.*)\s*$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim().Trim('"') # por si el valor viene con comillas
        Set-Item -Path "Env:$key" -Value $value
    }
}

$PROJECT_ID = $env:PROJECT_ID
$REGION = "us-central1"
$REPO = "keyfinder-api" # repositorio en Artifact Registry
$IMAGE = "release"
$BACKEND_PATH = Join-Path $PSScriptRoot "..\backend" # El contexto de build es /backend
$FULL_IMAGE = "$REGION-docker.pkg.dev/$PROJECT_ID/$REPO/${IMAGE}:latest"

# Build local
docker build --provenance=false --sbom=false -t $IMAGE $BACKEND_PATH

# Tag y push
docker tag $IMAGE $FULL_IMAGE
docker push $FULL_IMAGE

# Limpieza: deja solo las últimas 2 versiones, borra el resto
Write-Host "Limpiando versiones antiguas en Artifact Registry..."

$allVersions = gcloud artifacts docker images list "$REGION-docker.pkg.dev/$PROJECT_ID/$REPO" `
    --format="value(version)" `
    --sort-by="~CREATE_TIME"

$toDelete = $allVersions | Select-Object -Skip 2 

foreach ($digest in $toDelete) {
    Write-Host "Borrando versión $digest"
    gcloud artifacts docker images delete "$REGION-docker.pkg.dev/$PROJECT_ID/$REPO/${IMAGE}@$digest" --quiet --delete-tags
}

Write-Host "Listo. Imagen actual: $FULL_IMAGE"
