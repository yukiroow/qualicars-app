package com.qualinterns.dealership_app_api.controller;

import com.qualinterns.dealership_app_api.dto.AgentChangePassword;
import com.qualinterns.dealership_app_api.dto.AgentDto;
import com.qualinterns.dealership_app_api.dto.AgentLoginRequest;
import com.qualinterns.dealership_app_api.dto.RegisterAgentRequest;
import com.qualinterns.dealership_app_api.service.AgentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/agents")
public class AgentController {

    private final AgentService agentService;

    @GetMapping
    public ResponseEntity<HashMap<String, List<AgentDto>>> getAllAgents() {
        try {
            var agent = agentService.getAllAgents();
            HashMap<String, List<AgentDto>> response = new HashMap<>();
            response.put("agents", agent);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{username}")
    public ResponseEntity<HashMap<String, Optional<AgentDto>>> getAgentByUsername(@PathVariable String username) {
        var agent = agentService.getAgentByUsername(username);
        if (agent.isEmpty()) {
            System.out.println("Agent not found");
            return ResponseEntity.notFound().build();
        }
        HashMap<String, Optional<AgentDto>> response = new HashMap<>();
        response.put("agent", agent);
        return ResponseEntity.ok(response);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AgentDto> createAgent(@ModelAttribute RegisterAgentRequest request) {
        try {
            agentService.createAgent(request);
            System.out.println("Agent created successfully");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PatchMapping(path = "/{username}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateAgent(@PathVariable String username, @ModelAttribute @Validated AgentDto newAgentDetail) {
        try {
            AgentDto updatedAgent = agentService.updateAgent(username, newAgentDetail);
            return ResponseEntity.ok(updatedAgent);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PatchMapping(path = "/password/{username}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updatePassword(@PathVariable String username, @ModelAttribute @Validated AgentChangePassword newAgentPassword) {
        try {
            agentService.updatePassword(username, newAgentPassword);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(path = "/login", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> login(@ModelAttribute AgentLoginRequest request) {

        try {
            var loginRequest = agentService.login(request);

            if (loginRequest.equals("Login successful!")) {
                return ResponseEntity.ok(loginRequest);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginRequest);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
