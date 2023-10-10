resource "aws_api_gateway_resource" "api_gateway_resource" {
  rest_api_id = data.aws_api_gateway_rest_api.api_gateway.id
  parent_id   = var.api_gateway_parent_id
  path_part   = var.api_gateway_paths[0]
}

resource "aws_api_gateway_method" "api_gateway_method" {
  count = length(var.api_gateway_methods)

  rest_api_id   = data.aws_api_gateway_rest_api.api_gateway.id
  resource_id   = aws_api_gateway_resource.api_gateway_resource.id
  http_method   = var.api_gateway_methods[count.index]
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "api_gateway_integration" {
  count = length(var.api_gateway_methods)

  rest_api_id             = data.aws_api_gateway_rest_api.api_gateway.id
  resource_id             = aws_api_gateway_resource.api_gateway_resource.id
  http_method             = var.api_gateway_methods[count.index]
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda_function.invoke_arn
}

resource "aws_api_gateway_resource" "api_gateway_resource_n2" {
  rest_api_id = data.aws_api_gateway_rest_api.api_gateway.id
  parent_id   = aws_api_gateway_resource.api_gateway_resource.id
  path_part   = var.api_gateway_paths[1]
}

resource "aws_api_gateway_method" "api_gateway_method_n2" {
  count = length(var.api_gateway_methods)

  rest_api_id   = data.aws_api_gateway_rest_api.api_gateway.id
  resource_id   = aws_api_gateway_resource.api_gateway_resource_n2.id
  http_method   = var.api_gateway_methods[count.index]
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "api_gateway_integration_n2" {
  count = length(var.api_gateway_methods)

  rest_api_id             = data.aws_api_gateway_rest_api.api_gateway.id
  resource_id             = aws_api_gateway_resource.api_gateway_resource_n2.id
  http_method             = var.api_gateway_methods[count.index]
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda_function.invoke_arn
}

resource "aws_api_gateway_deployment" "api_gateway_deployment" {
  rest_api_id = data.aws_api_gateway_rest_api.api_gateway.id
  stage_name  = var.api_gateway_stage_name

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.api_gateway_resource.id,
      aws_api_gateway_method.api_gateway_method.*.id,
      aws_api_gateway_integration.api_gateway_integration.*.id,
      aws_api_gateway_resource.api_gateway_resource_n2.id,
      aws_api_gateway_method.api_gateway_method_n2.*.id,
      aws_api_gateway_integration.api_gateway_integration_n2.*.id
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [
    aws_api_gateway_integration.api_gateway_integration
  ]
}
