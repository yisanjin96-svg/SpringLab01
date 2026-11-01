package com.hoshimoto.lovemyself.flight.domain;

import java.time.LocalDateTime;

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
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

/*
* TODO1 : uniqueConstraints : 같은 항공편에 같은 좌석 번호가 두번 저장되지 않게 DB가 막는거라는데 무슨원리로?
* TODO2 : indexes -> 항공편별 좌석 상태를 빠르게 찾기위한 색인 -> 구조분석 필요
*/
@Entity 
@Table(name = "seat",
    uniqueConstraints = @UniqueConstraint(name = "uq_seat_flight_seat_number", columnNames = {"flight_id", "seat_number"}),
    indexes = @Index (name = "idx_seat_flight_status", columnList = "flight_id, status"))
@EntityListeners(AuditingEntityListener.class)
public class Seat {
    
    protected Seat(){}

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    // @Column(name = "seat_number", nullable = false, columnDefinition = "CHAR(4)")
    @Column(name = "seat_number", nullable = false, length = 4)
    private String seatNumber;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "seat_class", nullable = false, length = 20)
    private SeatClass seatClass;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private SeatStatus status;

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

    public String getSeatNumber() {
        return seatNumber;
    }

    public SeatClass getSeatClass() {
        return seatClass;
    }

    public SeatStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}


/**
 * 1. 선언 필드가 private String 컬럼이름; 형태이므로 선언 된 Entity에 직접 접근이 불가능함.
 * 2. 일종의 메서드 형태인 Getter로 (戻り値)만 본인 정보를 리턴하는 방식.
 * 
 * TODO3
 * 3. 기본생성자 protected Seat(){} 의 형태는 JPA가 DB행을 읽어서 객체를 만들때 생성자로 만든다.
 * -> 이거 공부 했었는데 원리에 대해 다시 공부 필요 TODO3 
 */