terraform {
    required_providers {
        render = {
            source = "render-oss/render"
            version = "~> 1.0"
        }
    }
}

provider "render" {
  # Set RENDER_API_KEY env variable in terminal
}

resource "render_web_service" "react-auth0-app" {
    name = "react-auth0-app"
    plan = "starter"
    region = "frankfurt"

    # block is where you define how Render builds app 
    runtime_source = {
        # docker block tells Render to use Dockerfile for building service
        docker = {
            auto_deploy = true
            branch = "main"
            repo_url = "https://github.com/siobhan-doherty/react-auth0-app"
            context = "."
            dockerfile_path = "Dockerfile"
            build_args = {
                REACT_APP_AUTH0_DOMAIN = var.auth0_domain
                REACT_APP_AUTH0_CLIENT_ID = var.auth0_client_id
            }
        }
    }
}

variable "auth0_domain" {
  type      = string
  sensitive = true
}

variable "auth0_client_id" {
  type      = string
  sensitive = true
}
