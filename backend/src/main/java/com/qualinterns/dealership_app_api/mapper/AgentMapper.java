package com.qualinterns.dealership_app_api.mapper;

import com.qualinterns.dealership_app_api.dto.AgentDto;
import com.qualinterns.dealership_app_api.dto.RegisterAgentRequest;
import com.qualinterns.dealership_app_api.model.Agent;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AgentMapper {
    AgentDto toDto(Agent agent);
    Agent toEntity(RegisterAgentRequest request);
}
