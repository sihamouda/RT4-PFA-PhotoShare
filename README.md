# PhotoShare

## Generate self signed certificate

Create the certificate:

    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout .nginx/ssl/private/nginx-selfsigned.key -out .nginx/ssl/certs/nginx-selfsigned.crt
