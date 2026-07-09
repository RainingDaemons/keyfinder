variable "project_id" {
    description = "GCP Project ID"
    type        = string
}

variable "service_name" {
    description = "Nombre del servicio de Cloud Run"
    type        = string
}

variable "service_region" {
    description = "GCP Region"
    type        = string
    default     = "us-central1"
}

variable "image" {
    description = "Nombre de la imagen de Docker"
    type        = string
}

variable "bucket_name" {
    description = "Nombre del bucket GCS"
    type        = string
}

variable "front_url" {
    type        = string
    description = "URL del frontend permitido para CORS"
}

variable "env" {
    type        = string
    description = "Ambiente de despliegue"
}
