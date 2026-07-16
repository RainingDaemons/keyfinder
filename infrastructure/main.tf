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

module "storage" {
    source = "./modules/storage"

    project_id    = var.project_id
    bucket_name   = "keyfinder-storage2"
    bucket_region = "us-central1"
}

module "run" {
    source = "./modules/run"

    project_id      = var.project_id
    service_account = var.service_account_buck
    service_name    = "keyfinder-run"
    service_region  = "us-central1"
    image           = "us-central1-docker.pkg.dev/${var.project_id}/keyfinder-api/release:latest"
    bucket_name     = "keyfinder-storage2"
    front_url       = "https://keyfinder.pages.dev"
    env             = "production"
}
