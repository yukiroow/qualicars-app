package com.qualinterns.dealership_app_api.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Data
public class TransactionDto {
    private int transaction_id;
    private OffsetDateTime date;
    private BigDecimal amount;

    private VehicleSummary vehicle;
    private AgentSummary agent;
    private CustomerSummary customer;

    @Data public static class VehicleSummary {
        private String make, engine_no, chassis_no, year, color;
    }
    @Data public static class AgentSummary {
        private String fullName, username;
    }
    @Data public static class CustomerSummary {
        private int customer_id;
        private String name;
    }

}
