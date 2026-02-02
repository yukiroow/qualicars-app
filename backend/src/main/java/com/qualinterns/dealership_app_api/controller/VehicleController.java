package com.qualinterns.dealership_app_api.controller;

import com.qualinterns.dealership_app_api.dto.VehicleDto;
import com.qualinterns.dealership_app_api.service.VehicleService;
import io.github.bucket4j.Bucket;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/vehicles")
public class VehicleController {

    private VehicleService vehicleService;
    public Bucket bucket;

    @GetMapping
    public ResponseEntity<?> getAllVehicles(@RequestParam(name = "available", required = false) boolean available,
                                                              @RequestParam(defaultValue = "0") int page,
                                                              @RequestParam int size) {
        try {
            if (!bucket.tryConsume(1))
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded. Try again later.");
            Pageable pageable = size == 0 ? Pageable.unpaged() : PageRequest.of(page, size);
            Page<?> vehicles;
            Map<String, Object> response = new HashMap<>();
            if (available) {
                vehicles = vehicleService.getAllAvailableVehicles(pageable);
            } else {
                vehicles = vehicleService.getAllVehicles(pageable);
            }
            response.put("vehicles", vehicles.getContent());
            response.put("currentPage", vehicles.getNumber());
            response.put("totalPages", vehicles.getTotalPages());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{make}")
    public ResponseEntity<?> getVehicleByMake(@PathVariable String make) {
        try {
            if (!bucket.tryConsume(1))
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded. Try again later.");
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
    public ResponseEntity<?> createVehicle(@ModelAttribute @Validated VehicleDto vehicleDto) {
        try {
            if (!bucket.tryConsume(1))
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded. Try again later.");
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
    public ResponseEntity<?> updateVehicle(@PathVariable int vehicleId, @RequestBody @Validated VehicleDto newVehicleDetails) {
        try {
            if (!bucket.tryConsume(1))
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded. Try again later.");
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
            if (!bucket.tryConsume(1))
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded. Try again later.");
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
