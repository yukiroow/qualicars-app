package com.qualinterns.dealership_app_api.service;

import com.qualinterns.dealership_app_api.dto.CustomerDto;
import com.qualinterns.dealership_app_api.mapper.CustomerMapper;
import com.qualinterns.dealership_app_api.model.Customer;
import com.qualinterns.dealership_app_api.repo.CustomerRepo;
import lombok.AllArgsConstructor;
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
    public List<CustomerDto> getAllCustomers() {
        return customerRepo.findAll()
                .stream()
                .map(customerMapper::toDto)
                .toList();
    }

    @Transactional
    public List<Customer> getAllCustomersWithId() {
        return customerRepo.findAll()
                .stream()
                .toList();
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
        existingCustomer.setName(newCustomerDetails.getName());
        existingCustomer.setContact(newCustomerDetails.getContact());
        existingCustomer.setAddress(newCustomerDetails.getAddress());
        Customer updatedCustomer = customerRepo.save(existingCustomer);
        return customerMapper.toDto(updatedCustomer);
    }

    @Transactional
    public void deleteCustomer(int customerId) {
        customerRepo.deleteById(customerId);
    }
}
