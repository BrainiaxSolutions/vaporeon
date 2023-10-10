resource "aws_api_gateway_resource" "api_gateway_resource_n1" {
  rest_api_id = data.aws_api_gateway_rest_api.api_gateway.id
  parent_id   = data.aws_api_gateway_resource.api_gateway_resource_n1.id
  path_part   = var.api_gateway_resources[1]
}

resource "aws_api_gateway_resource" "api_gateway_resource_n2" {
  rest_api_id = data.aws_api_gateway_rest_api.api_gateway.id
  parent_id   = aws_api_gateway_resource.api_gateway_resource_n1.id
  path_part   = var.api_gateway_resources[2]
}
