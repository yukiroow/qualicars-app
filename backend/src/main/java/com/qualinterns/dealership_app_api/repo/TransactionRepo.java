package com.qualinterns.dealership_app_api.repo;

import com.qualinterns.dealership_app_api.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface TransactionRepo extends JpaRepository<Transaction, Integer> {
    List<Transaction> findTop10ByAgentUsernameOrderByDateDesc(String username);

    @Query("SELECT t FROM Transaction t " +
            "JOIN FETCH t.vehicle " +
            "JOIN FETCH t.agent " +
            "JOIN FETCH t.customer " +
            "ORDER BY t.date DESC ")
    List<Transaction> findAllTransactions();

}
