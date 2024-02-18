package PFA.PhotoService.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.cassandra.config.AbstractCassandraConfiguration;
import org.springframework.data.cassandra.config.SchemaAction;

@Configuration
public class CassandraConfig extends AbstractCassandraConfiguration {

    @Value("${spring.data.cassandra.keyspace-name}")
    private String keySpace;

    @Value("${spring.data.cassandra.contact-points}")
    private String contactPoints;

    @Value("${spring.data.cassandra.port}")
    private int port;

    @Value("${spring.data.cassandra.username}")
    private String userName;

    @Value("${spring.data.cassandra.password}")
    private String password;

    @Value("${spring.data.cassandra.schema-action}")
    private SchemaAction schemaAction;

    @Override
    protected String getKeyspaceName() {
        return this.keySpace;
    }

    @Override
    public SchemaAction getSchemaAction() {
        return this.schemaAction;
    }

    @Override
    public String getContactPoints() {
        return this.contactPoints;
    }

    @Override
    public String[] getEntityBasePackages() {
        return new String[] { "PFA.PhotoService" };
    }

}