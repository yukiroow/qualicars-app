package com.qualinterns.dealership_app_api.dto;

import lombok.*;

@Data
public class VehicleDto {
    private String make;
    private String engine_no;
    private String chassis_no;
    private String year;
    private String color;
    private boolean available;
}
