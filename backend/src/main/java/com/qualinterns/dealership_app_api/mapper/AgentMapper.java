package com.qualinterns.dealership_app_api.mapper;

import com.qualinterns.dealership_app_api.dto.AgentDto;
import com.qualinterns.dealership_app_api.dto.RegisterAgentRequest;
import com.qualinterns.dealership_app_api.model.Agent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AgentMapper {
    AgentDto toDto(Agent agent);

    @Mapping(target = "agent_id", ignore = true)
    Agent toEntity(RegisterAgentRequest request);
}
