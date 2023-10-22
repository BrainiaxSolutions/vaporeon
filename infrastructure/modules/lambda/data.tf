data "aws_s3_object" "lambda_zip" {
  bucket = var.lambda_function_bucket_name
  key    = var.lambda_function_bucket_key

  depends_on = [aws_s3_object.lambda_function_source_code]
}

data "local_file" "lambda_package" {
  depends_on = [aws_s3_object.lambda_function_source_code]
  filename   = var.lambda_function_source_code_path
}
