package com.qualinterns.dealership_app_api.service;

import com.qualinterns.dealership_app_api.dto.AgentDto;
import com.qualinterns.dealership_app_api.dto.AgentLoginRequest;
import com.qualinterns.dealership_app_api.dto.RegisterAgentRequest;
import com.qualinterns.dealership_app_api.mapper.AgentMapper;
import com.qualinterns.dealership_app_api.model.Agent;
import com.qualinterns.dealership_app_api.repo.AgentRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AgentService {
    private final AgentRepo agentRepo;
    private final AgentMapper agentMapper;

    @Transactional(readOnly = true)
    public List<AgentDto> getAllAgents() {
        return agentRepo.findAll()
                .stream()
                .map(agentMapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public Optional<AgentDto> getAgentByUsername(String username) {
        return agentRepo.findByUsername(username)
                .map(agentMapper::toDto);
    }

    @Transactional
    public void createAgent(RegisterAgentRequest request) {
        var agent = agentMapper.toEntity(request);
        var savedAgent = agentRepo.save(agent);
        agentMapper.toDto(savedAgent);
    }

    @Transactional
    public AgentDto updateUsername(short agentId, AgentDto newAgentDetail) {
        Agent existingAgent = agentRepo.findById(agentId).orElse(null);
        existingAgent.setUsername(newAgentDetail.getUsername());
        Agent updatedAgent = agentRepo.save(existingAgent);
        return agentMapper.toDto(updatedAgent);
    }

    @Transactional
    public String login(AgentLoginRequest request) {

        var agent = agentRepo.findByUsername(request.getUsername()).orElse(null);

        if (agent != null && agent.getPassword().equals(request.getPassword())) {
            return "Login successful!";
        }
        return "Invalid username or password";
    }
}

