# Stage 1: Build stage with Alpine
FROM alpine:3.12 AS build

RUN apk update \
  && apk add --no-cache wget curl unzip 
RUN ls /bin
# Install consul-template
ARG CONSUL_TEMPLATE_VERSION=0.19.5
ENV CT_URL https://releases.hashicorp.com/consul-template/${CONSUL_TEMPLATE_VERSION}/consul-template_${CONSUL_TEMPLATE_VERSION}_linux_amd64.zip
RUN curl -O $CT_URL \
  && unzip consul-template_${CONSUL_TEMPLATE_VERSION}_linux_amd64.zip -d /usr/local/bin \
  && rm consul-template_${CONSUL_TEMPLATE_VERSION}_linux_amd64.zip

# Stage 2: Final stage with Prometheus
FROM prom/prometheus



COPY --from=build /usr/local/bin/consul-template /usr/local/bin/

COPY prometheus-template.yml /etc/consul-templates/prometheus-template.yml

# Copy start script
COPY start.sh /usr/local/bin/start.sh

# Start both consul-template and Prometheus
ENTRYPOINT ["/usr/local/bin/start.sh"]
