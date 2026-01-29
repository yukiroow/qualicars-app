package com.qualinterns.dealership_app_api.repo;

import com.qualinterns.dealership_app_api.model.Agent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource
public interface AgentRepo extends JpaRepository<Agent, Short> {
    Optional<Agent> findByUsername(String username);

    // Parameterized query
    @Query("SELECT a FROM agent WHERE a.username = :username")
    Optional<Agent> findByUsernameParameterized(@Param("username") String username);
}
