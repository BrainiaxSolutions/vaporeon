data "archive_file" "lambda_source_code" {
  type        = "zip"
  source_dir  = var.lambda_function_source_code_path
  output_path = "${var.lambda_function_output_path}/${var.lambda_function_name}.zip"
}

data "aws_api_gateway_rest_api" "api_gateway" {
  name = var.api_gateway_name
}

data "aws_api_gateway_domain_name" "api_gateway_domain_name" {
  domain_name = var.api_gateway_domain_name
}
