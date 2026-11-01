package com.hoshimoto.lovemyself.flight.domain;

import java.time.LocalDateTime;

import org.hibernate.annotations.Check;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;


@Entity 
@Table (name = "flight_fare", 
    uniqueConstraints = @UniqueConstraint(name = "uq_flight_fare_flight_class", columnNames = {"flight_id", "seat_class"}))
@Check (constraints = "amount >= 0")
@EntityListeners (AuditingEntityListener.class)
public class FlightFare {
    
    /**
     * DB制約를 엔티티 클래스에 선언
     * @UniqueConstraint : uniqueConstraints   
     *  의미 : 항공편ID와 클래스 같은 항공편에 클래스 2행 존재하는것을 거부 
     * @Check (constraints = "amount >= 0")
     *  의미 : 실무적으로 amount(운임총합)값이 0이상이 되어야함.
     */
    protected FlightFare(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flight_fare_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @Enumerated(EnumType.STRING)
    @Column(name = "seat_class", nullable = false, length = 20)
    private SeatClass seatClass;

    @Column(name = "amount", nullable = false)
    private Integer amount;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public Long getId() {
        return id;
    }

    public Flight getFlight() {
        return flight;
    }

    public SeatClass getSeatClass() {
        return seatClass;
    }

    public Integer getAmount() {
        return amount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    
}
