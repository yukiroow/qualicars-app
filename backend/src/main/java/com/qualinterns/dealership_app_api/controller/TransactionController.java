package com.qualinterns.dealership_app_api.controller;

import com.qualinterns.dealership_app_api.dto.RecentTransactionDto;
import com.qualinterns.dealership_app_api.dto.RegisterTransactionRequest;
import com.qualinterns.dealership_app_api.dto.TransactionDto;
import com.qualinterns.dealership_app_api.service.AgentService;
import com.qualinterns.dealership_app_api.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/transactions")
public class TransactionController {

    private AgentService agentService;
    private TransactionService transactionService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllTransaction(@RequestParam(defaultValue = "0") int page,
                                                                 @RequestParam(defaultValue = "50") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            var transactions = transactionService.getAllTransactions(pageable);
            Map<String, Object> response = new HashMap<>();
            response.put("transactions", transactions.getContent());
            response.put("currentPage", transactions.getNumber());
            response.put("totalPages", transactions.getTotalPages());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/agent/{username}")
    public ResponseEntity<HashMap<String, List<RecentTransactionDto>>> getTransactionsByUsername(@PathVariable String username) {
        try {
            if (!agentService.existsByUsername((username))) {
                return ResponseEntity.notFound().build();
            }
            var recentTransactions = transactionService.getRecentSalesByAgent(username);
            HashMap<String, List<RecentTransactionDto>> response = new HashMap<>();
            response.put("recentTransactions", recentTransactions);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TransactionDto> createTransaction(@ModelAttribute RegisterTransactionRequest request) {
        try {
            transactionService.createTransaction(request);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (DataIntegrityViolationException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
