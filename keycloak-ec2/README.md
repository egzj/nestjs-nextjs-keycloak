# Launch EC2 instance

- Instance Type: t2.micro
- AMI: Ubuntu
- Network: allow traffic from 80 (HTTP), 443 (HTTPS) and 22 (SSH)
- Storage: 20GB

# SSH into the instance

`ssh -i "key.pem" ubuntu@ec2-xx-xx-xx-xx.ap-southeast-1.compute.amazonaws.com`

# Install git & certbot

```shell
sudo apt-get update
sudo apt install git certbot -y
```

# Clone [docker repo](https://github.com/egzj/nestjs-nextjs.git)

```
git clone https://github.com/egzj/nestjs-nextjs.git
cd nestjs-nextjs/keycloak-ec2
```

# Install Docker

```shell
sudo chmod +x ./docker-ubuntu.sh
sudo ./docker-ubuntu.sh
```

# Get Free Domain

1. In the EC2 instance, `curl http://checkip.amazonaws.com` to get its public ip address
2. Go to https://freedns.afraid.org/subdomain/ to get a free domain
3. Point the domain to the ip address

# Obtain SSL Certificate using Certbot

Install Certbot and obtain an SSL certificate for your domain

**Install Certbot**

```shell
sudo apt-get install certbot
```

**Obtain SSL certificate** </br>

```shell
sudo certbot certonly --standalone -d <keycloak_server_domain> -m <your_email> --agree-tos
```

This creates the following files:

1. ssl_certificate: `/etc/letsencrypt/live/keycloak-demo01.duckdns.com/fullchain.pem`
2. ssl_certificate_key: `/etc/letsencrypt/live/keycloak-demo01.duckdns.com/privkey.pem`

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

source ./set-env.sh
```

# Update nginx.conf domains

```shell
server_name keycloak-demo01.duckdns.com;
ssl_certificate "/etc/letsencrypt/live/keycloak-demo01.duckdns.com/fullchain.pem";
ssl_certificate_key "/etc/letsencrypt/live/keycloak-demo01.duckdns.com/privkey.pem"
```

# Run keycloak server

```shell
cd keycloak
docker compose up -d
```
