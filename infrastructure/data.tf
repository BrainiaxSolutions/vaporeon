data "aws_api_gateway_rest_api" "api_gateway" {
  name = var.api_gateway_name
}

data "aws_api_gateway_resource" "api_gateway_resource_n1" {
  rest_api_id = data.aws_api_gateway_rest_api.api_gateway.id
  path        = "/${var.api_gateway_resources[0]}"
}

data "aws_api_gateway_authorizers" "authorizers" {
  rest_api_id = data.aws_api_gateway_rest_api.api_gateway.id
}

data "aws_api_gateway_authorizer" "authorizer" {
  rest_api_id   = data.aws_api_gateway_rest_api.api_gateway.id
  authorizer_id = data.aws_api_gateway_authorizers.authorizers.ids[0]
}

data "aws_secretsmanager_secret" "secrets" {
  name = var.secrets_manager_secret_name
}

data "aws_secretsmanager_secret_version" "secrets" {
  secret_id = data.aws_secretsmanager_secret.secrets.id
}

data "external" "secrets_manager_secret_json" {
  program = ["echo", "${data.aws_secretsmanager_secret_version.secrets.secret_string}"]
}