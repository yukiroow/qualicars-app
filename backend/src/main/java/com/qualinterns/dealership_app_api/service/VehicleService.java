package com.qualinterns.dealership_app_api.service;

import com.qualinterns.dealership_app_api.dto.VehicleDto;
import com.qualinterns.dealership_app_api.mapper.VehicleMapper;
import com.qualinterns.dealership_app_api.model.Vehicle;
import com.qualinterns.dealership_app_api.repo.VehicleRepo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class VehicleService {
    private final VehicleRepo vehicleRepo;
    private final VehicleMapper vehicleMapper;

    @Transactional(readOnly = true)
    public Page<VehicleDto> getAllVehicles(Pageable pageable) {
        return vehicleRepo.findAll(pageable)
                .map(vehicleMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Page<Vehicle> getAllAvailableVehicles(Pageable pageable) {
        return vehicleRepo.findByAvailableTrue(pageable);
    }

    @Transactional(readOnly = true)
    public List<VehicleDto> getVehicleByMake(String make) {
        return vehicleRepo.findByMake(make)
                .stream()
                .map(vehicleMapper::toDto)
                .toList();

    }

    @Transactional
    public void createVehicle(VehicleDto vehicleDto) {
        var vehicle = vehicleMapper.toEntity(vehicleDto);
        var savedVehicle = vehicleRepo.save(vehicle);
        vehicleMapper.toDto(savedVehicle);
    }

    @Transactional
    public VehicleDto updateVehicle(int vehicleId, VehicleDto newVehicleDetails) {
        Vehicle existingVehicle = vehicleRepo.findById(vehicleId).orElse(null);
        existingVehicle.setMake(newVehicleDetails.getMake());
        existingVehicle.setEngine_no(newVehicleDetails.getEngine_no());
        existingVehicle.setChassis_no(newVehicleDetails.getChassis_no());
        existingVehicle.setYear(newVehicleDetails.getYear());
        existingVehicle.setColor(newVehicleDetails.getColor());
        existingVehicle.setAvailable(newVehicleDetails.isAvailable());
        Vehicle updatedVehicle = vehicleRepo.save(existingVehicle);
        return vehicleMapper.toDto(updatedVehicle);
    }

    @Transactional
    public void deleteVehicle(int vehicleId) {
        vehicleRepo.deleteById(vehicleId);
    }
}
