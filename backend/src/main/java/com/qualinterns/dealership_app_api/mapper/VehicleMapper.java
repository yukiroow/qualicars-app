package com.qualinterns.dealership_app_api.mapper;

import com.qualinterns.dealership_app_api.dto.VehicleDto;
import com.qualinterns.dealership_app_api.model.Vehicle;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VehicleMapper {
    VehicleDto toDto(Vehicle vehicle);

    @Mapping(target = "vehicle_id", ignore = true)
    Vehicle toEntity(VehicleDto vehicleDto);
}
