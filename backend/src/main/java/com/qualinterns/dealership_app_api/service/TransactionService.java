package com.qualinterns.dealership_app_api.service;

import com.qualinterns.dealership_app_api.dto.RecentTransactionDto;
import com.qualinterns.dealership_app_api.dto.RegisterTransactionRequest;
import com.qualinterns.dealership_app_api.dto.TransactionDto;
import com.qualinterns.dealership_app_api.mapper.TransactionMapper;
import com.qualinterns.dealership_app_api.model.Transaction;
import com.qualinterns.dealership_app_api.model.Vehicle;
import com.qualinterns.dealership_app_api.repo.AgentRepo;
import com.qualinterns.dealership_app_api.repo.CustomerRepo;
import com.qualinterns.dealership_app_api.repo.TransactionRepo;
import com.qualinterns.dealership_app_api.repo.VehicleRepo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class TransactionService {
    private final TransactionRepo transactionRepo;
    private final AgentRepo agentRepo;
    private final CustomerRepo customerRepo;
    private final VehicleRepo vehicleRepo;
    private final TransactionMapper transactionMapper;

    // Optimized Query
    @Transactional(readOnly = true)
    public Page<TransactionDto> getAllTransactions(Pageable pageable) {
        return transactionRepo.findAllTransactions(pageable)
                .map(transactionMapper::toDto);
    }

    // Unoptimized Query
//    @Transactional(readOnly = true)
//    public List<TransactionDto> getAllTransaction() {
//        return transactionRepo.findAll()
//                .stream()
//                .map(transactionMapper::toDto)
//                .toList();
//
//    }

    @Transactional
    public void createTransaction(RegisterTransactionRequest request) {
        Transaction transaction = transactionMapper.toEntity(request);
        Vehicle vehicle = vehicleRepo.findById(request.getVehicle_id())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        vehicle.setAvailable(false);

        transaction.setVehicle(vehicle);

        transaction.setAgent(agentRepo.findById(request.getAgent_id())
                .orElseThrow(() -> new RuntimeException("Agent not found")));

        transaction.setCustomer(customerRepo.findById(request.getCustomer_id())
                .orElseThrow(() -> new RuntimeException("Customer not found")));

        transaction.setDate(OffsetDateTime.now());

        transactionRepo.save(transaction);
    }

    @Transactional(readOnly = true)
    public List<RecentTransactionDto> getRecentSalesByAgent(String username) {
        return transactionRepo.findTop10ByAgent_UsernameOrderByDateDesc(username)
                .stream()
                .map(transactionMapper::toRecentDto)
                .toList();
    }
}
