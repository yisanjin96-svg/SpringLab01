package com.hoshimoto.lovemyself.flight.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * 클린 아키텍처 20장 "엔티티": 항공편 1편의 핵심 데이터를 담고, 다른 도메인(airport)은 ID(공항 코드)로만 참조한다.
 */
@Entity
@Table(name = "flight")
@EntityListeners(AuditingEntityListener.class)
public class Flight {

    // JPA用のデフォルトコンストラクタ(外部からの生成を防ぐためprotected)
    protected Flight(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flight_id")
    private Long id;

    @Column(name = "flight_number", nullable = false, length = 10)
    private String flightNumber;

    // airportドメインはエンティティではなく空港コードで参照する
    @Column(name = "departure_airport", nullable = false, columnDefinition = "CHAR(3)")
    private String departureAirport;

    @Column(name = "arrival_airport", nullable = false, columnDefinition = "CHAR(3)")
    private String arrivalAirport;

    @Column(name = "departure_at", nullable = false)
    private LocalDateTime departureAt;

    @Column(name = "arrival_at", nullable = false)
    private LocalDateTime arrivalAt;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Getter
    public Long getId() {
        return id;
    }
    public String getFlightNumber() {
        return flightNumber;
    }
    public String getDepartureAirport() {
        return departureAirport;
    }
    public String getArrivalAirport() {
        return arrivalAirport;
    }
    public LocalDateTime getDepartureAt() {
        return departureAt;
    }
    public LocalDateTime getArrivalAt() {
        return arrivalAt;
    }

}
