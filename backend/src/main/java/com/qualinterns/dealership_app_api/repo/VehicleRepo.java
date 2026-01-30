package com.qualinterns.dealership_app_api.repo;

import com.qualinterns.dealership_app_api.model.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface VehicleRepo extends JpaRepository<Vehicle, Integer> {
    List<Vehicle> findByMake(String make);

    Page<Vehicle> findByAvailableTrue(Pageable pageable);
}
