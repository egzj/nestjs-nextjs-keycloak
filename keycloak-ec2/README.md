# Install git & certbot

```shell
sudo apt-get update
sudo apt install git certbot -y
```

# Clone [docker repo](https://github.com/egzj/nestjs-nextjs.git)

```
git clone https://github.com/egzj/nestjs-nextjs.git
cd keycloak-ec2
```

# Install Docker

```shell
sudo chmod +x ./docker-ubuntu.sh
sudo ./docker-ubuntu.sh
```

# Obtain SSL Certificate using Certbot

Install Certbot and obtain an SSL certificate for your domain. Make sure your host is accessible from the Internet

**Install Certbot**

```shell
sudo apt-get install certbot
```

**Obtain SSL certificate** </br>

```shell
sudo certbot certonly --standalone -d <keycloak_server_domain> -m <your_email> --agree-tos
```

# Update set-env.sh file

Check below property for nginx.conf and update correct server host

```shell
export KC_HOSTNAME_URL=https://keycloak-demo01.duckdns.com
export KEYCLOAK_FRONTEND_URL=https://keycloak-demo01.duckdns.com/auth
export KEYCLOAK_ADMIN=admin
export KEYCLOAK_ADMIN_PASSWORD=password

export POSTGRES_DB=keycloak
export POSTGRES_USER=admin
export POSTGRES_PASSWORD=password
```

# Run keycloak server

```shell
cd keycloak
docker compose up -d
```
