resource "google_storage_bucket" "main" {
    name     = var.bucket_name
    location = var.bucket_region

    storage_class               = "STANDARD"
    uniform_bucket_level_access = true
    public_access_prevention    = "inherited"

    force_destroy = false

    labels = {
        managed_by = "opentofu"
    }

    soft_delete_policy {
        retention_duration_seconds = 0
    }
}
