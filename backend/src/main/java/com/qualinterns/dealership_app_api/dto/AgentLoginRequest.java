package com.qualinterns.dealership_app_api.dto;

import lombok.Data;

@Data
public class AgentLoginRequest {
    private String username;
    private String password;
}
