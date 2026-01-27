package com.qualinterns.dealership_app_api.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Data
public class RegisterTransactionRequest {
    private int vehicle_id;
    private short agent_id;
    private int customer_id;
    private BigDecimal amount;
    private OffsetDateTime date;
}
