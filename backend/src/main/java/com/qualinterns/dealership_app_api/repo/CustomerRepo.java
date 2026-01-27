package com.qualinterns.dealership_app_api.repo;

import com.qualinterns.dealership_app_api.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import java.util.Optional;

@RepositoryRestResource
public interface CustomerRepo extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByName(String name);
}
