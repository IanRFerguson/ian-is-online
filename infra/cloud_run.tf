resource "google_cloud_run_v2_service" "cloud_run_service" {
  name                = "ianferguson-dev"
  location            = var.region
  deletion_protection = true
  ingress             = "INGRESS_TRAFFIC_ALL"

  client         = "gcloud"
  client_version = "531.0.0"

  traffic {
    percent = 100
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }

  template {
    max_instance_request_concurrency = 15
    service_account                  = "928973048225-compute@developer.gserviceaccount.com"

    containers {
      name  = "ianferguson-dev-1"
      image = var.image_name

      ports {
        container_port = 5000
      }

      resources {
        startup_cpu_boost = true
        cpu_idle          = true
        limits = {
          "cpu"    = "1000m"
          "memory" = "512Mi"
        }
      }

      env {
        name  = "RESEND_API_KEY"
        value = var.resend_api_key
      }
      env {
        name  = "CONTACT_EMAIL"
        value = var.contact_email
      }
    }
  }
}

resource "google_cloud_run_service_iam_binding" "cloud_run_service_invoker" {
  location = google_cloud_run_v2_service.cloud_run_service.location
  service  = google_cloud_run_v2_service.cloud_run_service.name
  role     = "roles/run.invoker"
  members = [
    "allUsers",
  ]
}
