package com.qualinterns.dealership_app_api.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "agent")
public class Agent {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "agent_id", nullable = false)
    private short agent_id;
    @Column(name = "first_name", nullable = false)
    private String first_name;
    @Column(name = "last_name", nullable = false)
    private String last_name;
    @Column(name = "username", nullable = false, unique = true)
    private String username;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "address", nullable = false)
    private String address;
    @Column(name = "contact", nullable = false)
    private String contact;

    private LocalDate date_joined;
}
