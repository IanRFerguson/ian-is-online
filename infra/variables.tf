variable "region" {
  description = "The GCP region to deploy resources in"
  type        = string
  default     = "us-central1"
}

variable "image_name" {
  description = "The name of the container image to deploy"
  type        = string
}

// Email JS config
variable "emailjs_service_id" {
  description = "EmailJS Service ID"
  type        = string
  sensitive   = true
}

variable "emailjs_template_id" {
  description = "EmailJS Template ID"
  type        = string
  sensitive   = true
}

variable "emailjs_public_key" {
  description = "Public key to connect to EmailJS"
  type        = string
  sensitive   = true
}
