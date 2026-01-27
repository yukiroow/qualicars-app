package com.qualinterns.dealership_app_api.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vehicle")
public class Vehicle {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "vehicle_id", nullable = false)
    private int vehicle_id;
    @Column(name = "make", nullable = false)
    private String make;
    @Column(name = "engine_no", nullable = false)
    private String engine_no;
    @Column(name = "chassis_no", nullable = false)
    private String chassis_no;
    @Column(name = "year", nullable = false)
    private String year;
    @Column(name = "color", nullable = false)
    private String color;
    @Column(name = "available", nullable = false)
    private boolean available;
}
