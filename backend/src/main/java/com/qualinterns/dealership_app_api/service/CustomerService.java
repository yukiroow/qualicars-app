package com.qualinterns.dealership_app_api.service;

import com.qualinterns.dealership_app_api.dto.CustomerDto;
import com.qualinterns.dealership_app_api.mapper.CustomerMapper;
import com.qualinterns.dealership_app_api.model.Customer;
import com.qualinterns.dealership_app_api.repo.CustomerRepo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CustomerService {
    private final CustomerRepo customerRepo;
    private final CustomerMapper customerMapper;

    @Transactional
    public Page<CustomerDto> getAllCustomers(Pageable pageable) {
        return customerRepo.findAll(pageable)
                .map(customerMapper::toDto);
    }

    @Transactional
    public Page<Customer> getAllCustomersWithId(Pageable pageable) {
        return customerRepo.findAll(pageable);
    }

    @Transactional
    public Optional<CustomerDto> getCustomerByName(@PathVariable String name) {
        return customerRepo.findByName(name)
                .map(customerMapper::toDto);
    }

    @Transactional
    public void createCustomer(CustomerDto customerDto) {
        var vehicle = customerMapper.toEntity(customerDto);
        var savedCustomer = customerRepo.save(vehicle);
        customerMapper.toDto(savedCustomer);
    }

    @Transactional
    public CustomerDto updateCustomer(int customerId, CustomerDto newCustomerDetails) {
        Customer existingCustomer = customerRepo.findById(customerId).orElse(null);

        assert existingCustomer != null;
        if (!newCustomerDetails.getName().isEmpty()) {
            existingCustomer.setName(newCustomerDetails.getName());
        }
        if (!newCustomerDetails.getContact().isEmpty()) {
            existingCustomer.setContact(newCustomerDetails.getContact());
        }
        if (!newCustomerDetails.getAddress().isEmpty()) {
            existingCustomer.setAddress(newCustomerDetails.getAddress());
        }
        Customer updatedCustomer = customerRepo.save(existingCustomer);
        return customerMapper.toDto(updatedCustomer);
    }

    @Transactional
    public void deleteCustomer(int customerId) {
        customerRepo.deleteById(customerId);
    }
}
