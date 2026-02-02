package com.qualinterns.dealership_app_api.controller;

import com.qualinterns.dealership_app_api.dto.CustomerDto;
import com.qualinterns.dealership_app_api.service.CustomerService;
import io.github.bucket4j.Bucket;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;
    private final Bucket bucket;

    @GetMapping
    public ResponseEntity<?> getAllCustomers(@RequestParam(name = "withId", required = false) boolean withId,
                                                               @RequestParam(defaultValue = "0") int page,
                                                               @RequestParam int size) {
        try {
            if (!bucket.tryConsume(1))
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded. Try again later.");
            Pageable pageable = size == 0 ? Pageable.unpaged() : PageRequest.of(page, size, Sort.by(Sort.Order.asc("name").ignoreCase()));
            Page<?> customers;
            Map<String, Object> response = new HashMap<>();
            if (withId) {
                customers = customerService.getAllCustomersWithId(pageable);
            } else {
                customers = customerService.getAllCustomers(pageable);
            }
            response.put("customers", customers.getContent());
            response.put("currentPage", customers.getNumber());
            response.put("totalPages", customers.getTotalPages());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{name}")
    public ResponseEntity<?> getCustomerByName(@PathVariable String name) {
        try {
            if (!bucket.tryConsume(1))
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded. Try again later.");
            var customer = customerService.getCustomerByName(name);
            if (customer.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(customer);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createCustomer(@ModelAttribute @Validated CustomerDto customerDto) {
        try {
            if (!bucket.tryConsume(1))
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded. Try again later.");
            customerService.createCustomer(customerDto);
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

    @PatchMapping(path = "/{customerId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateCustomer(@PathVariable int customerId, @ModelAttribute @Validated CustomerDto newCustomerDetails) {
        try {
            if (!bucket.tryConsume(1))
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded. Try again later.");
            CustomerDto updatedCustomer = customerService.updateCustomer(customerId, newCustomerDetails);
            return ResponseEntity.ok(updatedCustomer);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{customerId}")
    public ResponseEntity<?> deleteCustomer(@PathVariable int customerId) {
        try {
            if (!bucket.tryConsume(1))
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded. Try again later.");
            customerService.deleteCustomer(customerId);
            return ResponseEntity.noContent().build();
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
