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
$ADMIN = $env:ADMIN_EMAIL
$MEMBER = "user:$ADMIN"

# Cloud Run
gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member=$MEMBER --role="roles/run.admin"

# Cloud Storage
gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member=$MEMBER --role="roles/storage.admin"

# Artifact Registry
gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member=$MEMBER --role="roles/artifactregistry.admin"

# IAM (gestionar permisos de otros)
gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member=$MEMBER --role="roles/iam.securityAdmin"
