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
