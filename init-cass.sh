#!/usr/bin/env bash

until printf "" 2>>/dev/null >>/dev/tcp/cassandra/9042; do 
    sleep 5;
    echo "Waiting for cassandra...";
done

echo "Creating keyspace and tables..."
cqlsh cassandra -e "CREATE KEYSPACE IF NOT EXISTS photoshare WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};"