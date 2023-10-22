module "vaporeon_lambda_production" {
  source = "./modules/lambda"

  api_gateway_name                 = var.api_gateway_name
  api_gateway_stage_name           = var.api_gateway_stage_name
  api_gateway_domain_name          = var.api_gateway_domain_name
  api_gateway_methods              = var.api_gateway_methods
  api_gateway_paths                = var.api_gateway_paths
  api_gateway_resources            = var.api_gateway_resources
  api_gateway_parent_id            = aws_api_gateway_resource.api_gateway_resource_n2.id
  api_gateway_authorization_scopes = ["all"]
  api_gateway_authorizer_id        = data.aws_api_gateway_authorizer.authorizer.id

  lambda_function_name             = var.lambda_function_name
  lambda_function_description      = var.lambda_function_description
  lambda_function_handler          = var.lambda_function_handler
  lambda_function_source_code_path = var.lambda_function_source_code_path
  lambda_function_output_path      = var.lambda_function_output_path
  lambda_function_bucket_name      = var.lambda_function_bucket_name
  lambda_function_bucket_key       = var.lambda_function_bucket_key
  lambda_function_timeout          = "600"

  lambda_function_env = {
    APP_ENVIRONMENT = "PRD",
    PORT            = "4000",
    DB_NAME         = "mongodb",
    URL_MAPS        = "https://www.google.com/maps/dir/",
    DB_URL          = "${data.external.secrets_manager_secret_json.result["DB_URL"]}",
    URL_PIDGEY      = "${data.external.secrets_manager_secret_json.result["URL_PIDGEY"]}",
  }

  lambda_function_cors = {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["*"]
    allow_headers     = ["date", "keep-alive"]
    expose_headers    = ["keep-alive", "date"]
    max_age           = 86400
  }

  tags = {
    Name   = "api",
    Team   = "Pluvial"
    Env    = "prd"
    Lambda = "Vaporeon"
  }
}

output "vaporeon_lambda_production" {
  value = module.vaporeon_lambda_production
}
