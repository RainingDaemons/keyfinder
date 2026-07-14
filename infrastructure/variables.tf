variable "project_id" {
    description = "GCP Project ID"
    type        = string
}

variable "service_account_buck" {
    description = "Service account from Cloud Run who can access Buckets"
    type        = string
}
