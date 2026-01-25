variable "region" {
  description = "The GCP region to deploy resources in"
  type        = string
  default     = "us-central1"
}

variable "image_name" {
  description = "The name of the container image to deploy"
  type        = string
}

variable "resend_api_key" {
  description = "The API key for Resend email service"
  type        = string
  sensitive   = true
}

variable "contact_email" {
  description = "The contact email address for the application"
  type        = string
}
