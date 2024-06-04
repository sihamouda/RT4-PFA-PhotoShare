#!/bin/sh

# Start Vault server in the background
vault server -config /data/vault-test.hcl &

# Give Vault some time to start
sleep 10

# Export values
export VAULT_ADDR='http://0.0.0.0:8201'
export VAULT_SKIP_VERIFY='true'

# Check if Vault is already initialized
vault status -format=json | jq -e '.initialized' > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "Vault is already initialized. Unsealing..."
  
  # Parse unseal keys from JSON file
  if [ -f /data/generated_keys.json ]; then
    unseal_keys=$(jq -r '.unseal_keys_b64[]' < /data/generated_keys.json)
  else
    echo "Error: /data/generated_keys.json not found."
    exit 1
  fi
  
  # Unseal Vault
  for key in $unseal_keys; do
    vault operator unseal "$key"
  done

  # Get root token from JSON file
  root_token=$(jq -r '.root_token' < /data/generated_keys.json)
  echo "$root_token" > /data/root_token.txt
  export VAULT_TOKEN="$root_token"

else
  echo "Initializing Vault..."
  # Initialize Vault
  vault operator init -format=json > /data/generated_keys.json

  # Parse unseal keys and root token
  unseal_keys=$(jq -r '.unseal_keys_b64[]' < /data/generated_keys.json)
  root_token=$(jq -r '.root_token' < /data/generated_keys.json)

  echo "$root_token" > /data/root_token.txt
  export VAULT_TOKEN="$root_token"

  # Unseal Vault
  for key in $unseal_keys; do
    vault operator unseal "$key"
  done
fi

# Enable kv secrets engine
vault secrets enable -version=1 kv

# Enable userpass authentication and add default user
vault auth enable userpass
vault policy write spring-policy /data/spring-policy.hcl
vault write auth/userpass/users/admin password="${SECRET_PASS}" policies=spring-policy

# Add test value to kv store
vault kv put kv/my-secret my-value=s3cr3t
