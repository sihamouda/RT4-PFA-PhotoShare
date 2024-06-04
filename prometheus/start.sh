#!/bin/sh

# Start consul-template
sleep 300
# Wait for services to register
# until curl -sSf http://consul:8500/v1/health/service/user | jq -e '.[].Checks[].Status' | grep -q "passing"; do
#   echo "Waiting for services to register..."
#   sleep 5
# done
consul-template \
  -consul-addr consul:8500 \
  -template "/etc/consul-templates/prometheus-template.yml:/etc/prometheus/prometheus.yml:curl -X POST :9090/-/reload" &

# Start Prometheus
/bin/prometheus --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/prometheus
