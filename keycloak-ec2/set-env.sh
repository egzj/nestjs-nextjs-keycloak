#!/bin/bash
set -e

export KC_HOSTNAME_URL=https://keycloak-demo01.duckdns.com
# export KEYCLOAK_FRONTEND_URL=https://keycloak-demo01.duckdns.com/auth
export KEYCLOAK_ADMIN=admin
export KEYCLOAK_ADMIN_PASSWORD=password

export POSTGRES_DB=keycloak
export POSTGRES_USER=admin
export POSTGRES_PASSWORD=password
