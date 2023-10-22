variable "api_gateway_name" {
  description = "AWS API Gateway to hold all lambda triggers"
  type        = string
  default     = "pluvial-api"
}

variable "api_gateway_stage_name" {
  description = "AWS API Gateway stage name"
  type        = string
  default     = "production"
}

variable "api_gateway_domain_name" {
  description = "AWS API Gateway domain name"
  type        = string
  default     = "api.pluvial.brainiax.com.br"
}

variable "api_gateway_methods" {
  description = "AWS API Gateway lambda method"
  type        = list(string)
  default     = ["POST", "PATCH"]
}

variable "api_gateway_paths" {
  description = "AWS API Gateway lambda paths"
  type        = list(string)
  default     = ["metric", "reset"]
}

variable "api_gateway_resources" {
  description = "Path where AWS Lambda will be stored"
  type        = list(string)
  default     = ["api", "vaporeon", "v1"]
}

variable "lambda_function_name" {
  description = "AWS Lambda function name"
  type        = string
  default     = "vaporeon-api"
}

variable "lambda_function_description" {
  description = "AWS Lambda function description"
  type        = string
  default     = "Vaporeon API Lambda function"
}

variable "lambda_function_handler" {
  description = "AWS Lambda function handler"
  type        = string
  default     = "lambda.handler"
}

variable "lambda_function_bucket_name" {
  description = "AWS Lambda function bucket name"
  type        = string
  default     = "pluvial-lambdas-deployments-bucket"
}

variable "lambda_function_bucket_key" {
  description = "AWS Lambda function bucket key"
  type        = string
  default     = "vaporeon/dist.zip"
}

variable "lambda_function_source_code_path" {
  description = "Path where AWS Lambda source code will be stored"
  type        = string
  default     = "../vaporeon/dist.zip"
}

variable "lambda_function_output_path" {
  description = "Path where AWS Lambda output will be stored"
  type        = string
  default     = "../dist"
}

variable "secrets_manager_secret_name" {
  description = "AWS Secrets Manager secret name"
  type        = string
  default     = "pluvial-vaporeon-secrets"
}
