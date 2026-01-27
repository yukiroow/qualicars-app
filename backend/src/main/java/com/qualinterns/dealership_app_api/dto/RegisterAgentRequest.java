package com.qualinterns.dealership_app_api.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterAgentRequest {
    private String first_name;
    private String last_name;
    private String username;
    private String password;
    private String address;
    private String contact;
}
