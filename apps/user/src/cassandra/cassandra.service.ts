import { Injectable } from '@nestjs/common';
import { Client, types as CassandraTypes, mapping } from 'cassandra-driver';

@Injectable()
export class CassandraService {
    client: Client;
    mapper: mapping.Mapper;

    constructor() {
        this.initializeCassandraClient();
    }

    private async initializeCassandraClient(): Promise<void> {
        this.client = new Client({
            contactPoints: ['127.0.0.1'],
            keyspace: 'photoshare',
            localDataCenter: 'datacenter1'


        });

        this.mapper = new mapping.Mapper(this.client, {
            models: {
                "User": {
                    tables: ['users']
                },

            }
        })
        try {
            const result = await this.client.connect();
            console.log(`Connected to ${this.client.hosts.length} nodes in the cluster: ${this.client.hosts.keys().join(', ')}`)

        } catch (error) {
            console.error('Error connecting to Cassandra:', error);
            throw error; // Rethrow error to handle it in the calling context
        }
    }

}
