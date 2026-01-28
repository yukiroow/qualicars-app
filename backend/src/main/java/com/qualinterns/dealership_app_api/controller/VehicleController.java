package com.qualinterns.dealership_app_api.controller;

import com.qualinterns.dealership_app_api.dto.VehicleDto;
import com.qualinterns.dealership_app_api.service.VehicleService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/vehicles")
public class VehicleController {

    private VehicleService vehicleService;

    @GetMapping
    public ResponseEntity<?> getAllVehicles(@RequestParam(name = "available", required = false) boolean available) {
        try {
            Object vehicles;
            Map<String, Object> response = new HashMap<>();
            if (available) {
                vehicles = vehicleService.getAllAvailableVehicles();
            } else {
                vehicles = vehicleService.getAllVehicle();
            }
            response.put("vehicles", vehicles);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{make}")
    public ResponseEntity<List<VehicleDto>> getVehicleByMake(@PathVariable String make) {
        try {
            var vehicles = vehicleService.getVehicleByMake(make);
            if (vehicles.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(vehicles);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<VehicleDto> createVehicle(@ModelAttribute VehicleDto vehicleDto) {
        try {
            vehicleService.createVehicle(vehicleDto);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PatchMapping("/{vehicleId}")
    public ResponseEntity<?> updateVehicle(@PathVariable int vehicleId, @RequestBody VehicleDto newVehicleDetails) {
        try {
            VehicleDto updatedVehicle = vehicleService.updateVehicle(vehicleId, newVehicleDetails);
            return ResponseEntity.ok(updatedVehicle);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{vehicleId}")
    public ResponseEntity<?> deleteVehicle(@PathVariable int vehicleId) {
        try {
            vehicleService.deleteVehicle(vehicleId);
            return ResponseEntity.noContent().build();
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
