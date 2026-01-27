package com.qualinterns.dealership_app_api.dto;

import lombok.*;

import java.time.LocalDate;

@Data
public class AgentDto {
    private short agent_id;
    private String first_name;
    private String last_name;
    private String username;
    private String address;
    private String contact;
    private LocalDate date_joined;
}
