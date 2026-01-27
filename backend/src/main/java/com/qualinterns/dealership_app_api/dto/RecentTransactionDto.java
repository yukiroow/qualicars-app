package com.qualinterns.dealership_app_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
@AllArgsConstructor
public class RecentTransactionDto {
    private OffsetDateTime date;
    private VehicleSale vehicle;

    @Data public static class VehicleSale {
        private String make, year, color;
    }
}
