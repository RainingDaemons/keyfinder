variable "project_id" {
    description = "GCP Project ID"
    type        = string
}

variable "bucket_name" {
    description = "Nombre del bucket GCS"
    type        = string
}

variable "bucket_region" {
    description = "GCP Region"
    type        = string
    default     = "us-central1"
}