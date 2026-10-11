package com.hoshimoto.lovemyself.flight.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hoshimoto.lovemyself.flight.domain.Flight;

/**
 * 클린 아키텍처 23장 "데이터베이스 게이트웨이": 항공편 조회 쿼리를 인터페이스 뒤로 숨겨 service가 DB 구현 세부사항에 의존하지 않게 한다.
 */
public interface FlightRepository extends JpaRepository<Flight, Long>{

    @Query("SELECT f FROM Flight f "
    + " WHERE f.departureAirport = :departureAirport "
    + " AND f.arrivalAirport = :arrivalAirport" 
    + " AND f.departureAt >= :now" 
    + " ORDER BY f.departureAt ASC")
    public List<Flight> searchFlights(
        @Param("departureAirport") String departureAirport, 
        @Param("arrivalAirport") String arrivalAirport,
        @Param("now") LocalDateTime now);
}
