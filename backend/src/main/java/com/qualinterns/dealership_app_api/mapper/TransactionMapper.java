package com.qualinterns.dealership_app_api.mapper;

import com.qualinterns.dealership_app_api.dto.RecentTransactionDto;
import com.qualinterns.dealership_app_api.dto.RegisterTransactionRequest;
import com.qualinterns.dealership_app_api.dto.TransactionDto;
import com.qualinterns.dealership_app_api.model.Agent;
import com.qualinterns.dealership_app_api.model.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TransactionMapper {
    TransactionDto toDto(Transaction transaction);

    @Mapping(target = "fullName", source = "agent")
    TransactionDto.AgentSummary toAgentSummary(Agent agent);

    default String mapAgentToFullName(Agent agent) {
        if (agent == null) return null;
        String first = (agent.getFirst_name() != null) ? agent.getFirst_name() : "";
        String last = (agent.getLast_name() != null) ? agent.getLast_name() : "";

        return (first + " " + last).trim();
    }

    Transaction toEntity(RegisterTransactionRequest request);
    RecentTransactionDto toRecentDto(Transaction transaction);
}
