resource "google_cloud_run_v2_service" "api" {
    name     = "${var.service_name}"
    location = "${var.service_region}"
    ingress  = "INGRESS_TRAFFIC_ALL" # equivalente a --allow-unauthenticated

    template {
        containers {
            image = "${var.image}"

            resources {
                limits = {
                    cpu    = "1"
                    memory = "512Mi"
                }
            }

            ports {
                container_port = 8080
            }

            # --set-env-vars
            env {
                name  = "GCS_BUCKET"
                value = "${var.bucket_name}"
            }
        }
    }

    scaling {
        min_instance_count = 0
        max_instance_count = 1
    }

    # Cuando es false, OpenTofu puede eliminar el servicio sin necesitar confirmación adicional
    deletion_protection = false
}

# IAM - Permitir acceso público a este recurso
resource "google_cloud_run_v2_service_iam_member" "public" {
    project  = var.project_id
    location = var.service_region
    name     = var.service_name
    role     = "roles/run.invoker"
    member   = "allUsers"
}
