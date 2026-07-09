terraform {
    required_providers {
        google = {
            source = "hashicorp/google"
            version = "7.39.0"
        }
    }
}

provider "google" {
    project = "${var.project_id}"
    region  = "us-central1"
    zone    = "us-central1-c"
}

module "run" {
    source = "./modules/run"

    project_id     = var.project_id
    service_name   = "keyfinder-api-service"
    service_region = "us-central1"
    image          = "us-central1-docker.pkg.dev/${var.project_id}/keyfinder-api/release:latest"
    bucket_name    = "keyfinder-storage"
    front_url      = "https://keyfinder.pages.dev"
    env            = "production"
}

module "storage" {
    source = "./modules/storage"

    project_id    = var.project_id
    bucket_name   = "keyfinder-storage"
    bucket_region = "us-central1"
}
