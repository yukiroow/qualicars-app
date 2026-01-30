package com.qualinterns.dealership_app_api.service;

import com.qualinterns.dealership_app_api.dto.AgentChangePassword;
import com.qualinterns.dealership_app_api.dto.AgentDto;
import com.qualinterns.dealership_app_api.dto.AgentLoginRequest;
import com.qualinterns.dealership_app_api.dto.RegisterAgentRequest;
import com.qualinterns.dealership_app_api.mapper.AgentMapper;
import com.qualinterns.dealership_app_api.model.Agent;
import com.qualinterns.dealership_app_api.repo.UnsafeQuery;
import com.qualinterns.dealership_app_api.repo.AgentRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AgentService {
    private final AgentRepo agentRepo;
    private final AgentMapper agentMapper;
    private final PasswordEncoder passwordEncoder;
    private final UnsafeQuery unsafeQuery;

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

    @Transactional(readOnly = true)
    public boolean existsByUsername(String username) {
        return agentRepo.existsByUsername(username);
    }

    @Transactional
    public void createAgent(RegisterAgentRequest request) {
        var agent = agentMapper.toEntity(request);
        agent.setPassword(passwordEncoder.encode(agent.getPassword()));
        agent.setDate_joined(LocalDate.now());
        var savedAgent = agentRepo.save(agent);
        agentMapper.toDto(savedAgent);
    }

    @Transactional
    public AgentDto updateAgent(String username, AgentDto newAgentDetails) {
        Agent existingAgent = agentRepo.findByUsername(username).orElse(null);
        assert existingAgent != null;

        if (!newAgentDetails.getFirst_name().isEmpty()) {
            existingAgent.setFirst_name(newAgentDetails.getFirst_name());
        }
        if (!newAgentDetails.getLast_name().isEmpty()) {
            existingAgent.setLast_name(newAgentDetails.getLast_name());
        }
        if (!newAgentDetails.getUsername().isEmpty()) {
            existingAgent.setUsername(newAgentDetails.getUsername());
        }
        if (!newAgentDetails.getAddress().isEmpty()) {
            existingAgent.setAddress(newAgentDetails.getAddress());
        }
        if (!newAgentDetails.getContact().isEmpty()) {
            existingAgent.setContact(newAgentDetails.getContact());
        }
        Agent updatedAgent = agentRepo.save(existingAgent);
        return agentMapper.toDto(updatedAgent);
    }

    @Transactional
    public void updatePassword(String username, AgentChangePassword newAgentPassword) {
        Agent existingAgent = agentRepo.findByUsername(username).orElse(null);
        assert existingAgent != null;
        existingAgent.setPassword(passwordEncoder.encode(newAgentPassword.getPassword()));
        agentRepo.save(existingAgent);
    }

    @Transactional
    public String login(AgentLoginRequest request) {

        var agent = agentRepo.findByUsername(request.getUsername()).orElse(null);

        if (agent != null && passwordEncoder.matches(request.getPassword(), agent.getPassword())) {
            return "Login successful!";
        }
        return "Invalid username or password";
    }

    // Sample username input: newtest' OR '1'='1
    // For password input: Accepts any string, including empty values
//    @Transactional
//    public String login(AgentLoginRequest request) throws SQLException {
//        var agent = unsafeQuery.login(request);
//        if (agent.isPresent() ) {
//            return "Login successful!";
//        }
//        return "Invalid username or password";
//    }
}