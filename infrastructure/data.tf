data "aws_api_gateway_rest_api" "api_gateway" {
  name = var.api_gateway_name
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