package com.hoshimoto.lovemyself.airport.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table (name="airport")
@EntityListeners(AuditingEntityListener.class) 
public class Airport {

    
    // JPA用のデフォルトコンストラクタ(外部からの生成を防ぐためprotected)
    protected Airport(){}
    
    @Id 
    @Column(name = "airport_code", columnDefinition = "CHAR(3)")
    private String airportCode;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @CreatedDate 
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate 
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Getter
    public String getAirportCode() {
        return airportCode;
    }
    public String getName() {
        return name;
    }
    public String getCity() {
        return city;
    }

}
