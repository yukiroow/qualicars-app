package com.qualinterns.dealership_app_api.mapper;

import com.qualinterns.dealership_app_api.dto.CustomerDto;
import com.qualinterns.dealership_app_api.model.Customer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    CustomerDto toDto(Customer customer);
    Customer toEntity(CustomerDto customerDto);
}
