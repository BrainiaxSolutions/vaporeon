variable "lambda_function_name" {
  description = "AWS Lambda function name"
  type        = string
}

variable "lambda_function_description" {
  description = "AWS Lambda function description"
  type        = string
}

variable "lambda_function_runtime" {
  description = "AWS Lambda function runtime"
  type        = string
  default     = "nodejs18.x"
}

variable "lambda_function_timeout" {
  description = "AWS Lambda function timeout"
  type        = number
  default     = 10
}

variable "lambda_function_memory_size" {
  description = "AWS Lambda function memory size in MB"
  type        = number
  default     = 128
}

variable "lambda_function_source_code_path" {
  description = "Path that will be used to upload source code to AWS Lambda"
  type        = string
}

variable "lambda_function_output_path" {
  description = "Path where AWS Lambda artifacts will be stored"
  type        = string
}

variable "tags" {
  description = "Common tags that will be used to tag all resources"
  type        = map(string)
  default     = {}
}

variable "lambda_function_env" {
  description = "AWS Lambda environment variables"
  type        = map(any)
}

variable "lambda_function_handler" {
  description = "AWS Lambda function handler"
  type        = string
}

variable "lambda_function_cors" {
  description = "AWS Lambda URL CORS properties"
  type = object({
    allow_credentials = bool
    allow_origins     = list(string)
    allow_methods     = list(string)
    allow_headers     = list(string)
    expose_headers    = list(string)
    max_age           = number
  })
}

variable "lambda_function_bucket_name" {
  description = "AWS Lambda function bucket name"
  type        = string
}

variable "lambda_function_bucket_key" {
  description = "AWS Lambda function bucket key"
  type        = string
}

variable "api_gateway_name" {
  description = "AWS API Gateway to hold all lambda triggers"
  type        = string
}

variable "api_gateway_stage_name" {
  description = "AWS API Gateway stage name"
  type        = string
}

variable "api_gateway_domain_name" {
  description = "AWS API Gateway domain name"
  type        = string
}

variable "api_gateway_methods" {
  description = "AWS API Gateway lambda method"
  type        = list(string)
}

variable "api_gateway_paths" {
  description = "AWS API Gateway lambda paths"
  type        = list(string)
}

variable "api_gateway_status_code" {
  description = "AWS API Gateway lambda response status code"
  type        = string
  default     = "200"
}

variable "api_gateway_resources" {
  description = "Path where AWS Lambda will be stored"
  type        = list(string)
}

variable "api_gateway_parent_id" {
  description = "AWS API Gateway parent id"
  type        = string
}

variable "api_gateway_authorizer_id" {
  description = "AWS API Gateway authorizer id"
  type        = string
}

variable "api_gateway_authorization_scopes" {
  description = "AWS API Gateway authorization scopes"
  type        = list(string)
}
