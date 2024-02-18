package PFA.PhotoService.repository;

import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import PFA.PhotoService.entities.PhotoEntity;

@Repository
public interface PhotoRepository extends CassandraRepository<PhotoEntity, UUID> {
}
