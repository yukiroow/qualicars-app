package com.qualinterns.dealership_app_api.controller;

import com.qualinterns.dealership_app_api.dto.RecentTransactionDto;
import com.qualinterns.dealership_app_api.dto.RegisterTransactionRequest;
import com.qualinterns.dealership_app_api.dto.TransactionDto;
import com.qualinterns.dealership_app_api.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
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

    private TransactionService transactionService;

    @GetMapping("/slow")
    public ResponseEntity<Map<String, List<TransactionDto>>> getAllTransaction() {
        try {
            var transactions = transactionService.getAllTransaction();
            HashMap<String, List<TransactionDto>> response = new HashMap<>();
            response.put("transactions", transactions);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, List<TransactionDto>>> getAllTransactions() {
        try {
            var transactions = transactionService.getAllTransactions();
            HashMap<String, List<TransactionDto>> response = new HashMap<>();
            response.put("transactions", transactions);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/agent/{username}")
    public ResponseEntity<HashMap<String, List<RecentTransactionDto>>> getTransactionsByUsername(@PathVariable String username) {
        try {
            var recentTransactions = transactionService.getRecentSalesByAgent(username);
            if (recentTransactions.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
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
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
