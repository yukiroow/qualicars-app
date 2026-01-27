package com.qualinterns.dealership_app_api.mapper;

import com.qualinterns.dealership_app_api.dto.CustomerDto;
import com.qualinterns.dealership_app_api.model.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    CustomerDto toDto(Customer customer);

    @Mapping(target = "customer_id", ignore = true)
    Customer toEntity(CustomerDto customerDto);
}
