data "aws_s3_object" "lambda_zip" {
  bucket = var.lambda_function_bucket_name
  key    = var.lambda_function_bucket_key

  depends_on = [aws_s3_bucket.lambda_function_bucket]
}

data "local_file" "lambda_package" {
  depends_on = [aws_s3_object.lambda_function_source_code]
  filename   = var.lambda_function_source_code_path
}

data "aws_api_gateway_rest_api" "api_gateway" {
  name = var.api_gateway_name
}

data "aws_api_gateway_domain_name" "api_gateway_domain_name" {
  domain_name = var.api_gateway_domain_name
}
