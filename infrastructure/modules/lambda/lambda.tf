resource "aws_s3_object" "lambda_function_source_code" {
  bucket = var.lambda_function_bucket_name
  key    = var.lambda_function_bucket_key
  source = var.lambda_function_source_code_path
}

resource "aws_lambda_function" "lambda_function" {
  function_name = var.lambda_function_name
  description   = var.lambda_function_description
  handler       = var.lambda_function_handler
  runtime       = var.lambda_function_runtime
  role          = aws_iam_role.iam_role.arn
  tags          = var.tags

  # filename         = data.archive_file.lambda_source_code.output_path
  # source_code_hash = data.archive_file.lambda_source_code.output_base64sha256
  s3_bucket = var.lambda_function_bucket_name
  s3_key    = var.lambda_function_bucket_key

  timeout     = var.lambda_function_timeout
  memory_size = var.lambda_function_memory_size

  environment {
    variables = var.lambda_function_env
  }
}

resource "aws_lambda_function_url" "mylambda_function_url" {
  function_name      = aws_lambda_function.lambda_function.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = var.lambda_function_cors.allow_credentials
    allow_origins     = var.lambda_function_cors.allow_origins
    allow_methods     = var.lambda_function_cors.allow_methods
    allow_headers     = var.lambda_function_cors.allow_headers
    expose_headers    = var.lambda_function_cors.expose_headers
    max_age           = var.lambda_function_cors.max_age
  }
}

resource "aws_lambda_permission" "lambda_permission" {
  function_name = aws_lambda_function.lambda_function.function_name
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  principal     = "apigateway.amazonaws.com"
}
