package dev.agnes.selogerAPI.repository;

import dev.agnes.selogerAPI.ERole;
import dev.agnes.selogerAPI.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
