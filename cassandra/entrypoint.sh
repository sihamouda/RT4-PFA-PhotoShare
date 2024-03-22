#!/usr/bin/env bash

until printf "" 2>>/dev/null >>/dev/tcp/cassandra/9042; do 
    sleep 5;
    echo "Waiting for Cassandra...";
done

echo "Creating keyspace and table..."
cqlsh cassandra -u cassandra -p cassandra -e "CREATE KEYSPACE IF NOT EXISTS photoshare WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};"

echo "Creating table users..."
cqlsh cassandra -u cassandra -p cassandra -e "
    CREATE TABLE IF NOT EXISTS photoshare.users (
        id UUID,
        username TEXT,
        email TEXT,
        age INT,
        someotherdata TEXT,
        PRIMARY KEY ((username, email))
    )
"
