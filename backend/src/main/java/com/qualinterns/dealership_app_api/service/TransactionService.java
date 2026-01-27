package com.qualinterns.dealership_app_api.service;

import com.qualinterns.dealership_app_api.dto.RecentTransactionDto;
import com.qualinterns.dealership_app_api.dto.RegisterTransactionRequest;
import com.qualinterns.dealership_app_api.dto.TransactionDto;
import com.qualinterns.dealership_app_api.mapper.TransactionMapper;
import com.qualinterns.dealership_app_api.repo.TransactionRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@Service
@AllArgsConstructor
public class TransactionService {
    private final TransactionRepo transactionRepo;
    private final TransactionMapper transactionMapper;

    // Optimized Query
    @Transactional(readOnly = true)
    public List<TransactionDto> getAllTransactions() {
        return transactionRepo.findAllTransactions()
                .stream()
                .map(transactionMapper::toDto)
                .toList();
    }

    // Unoptimized Query
    @Transactional(readOnly = true)
    public List<TransactionDto> getAllTransaction() {
        return transactionRepo.findAll()
                .stream()
                .map(transactionMapper::toDto)
                .toList();

    }

    @Transactional
    public void createTransaction(RegisterTransactionRequest request) {
        var transaction = transactionMapper.toEntity(request);
        var savedTransaction = transactionRepo.save(transaction);
        transactionMapper.toDto(savedTransaction);
    }

    @Transactional(readOnly = true)
    public List<RecentTransactionDto> getRecentSalesByAgent(String username) {
        return transactionRepo.findTop10ByAgentUsernameOrderByDateDesc(username)
                .stream()
                .map(transactionMapper::toRecentDto)
                .toList();
    }
}
