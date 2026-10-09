package com.hoshimoto.lovemyself.flight.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hoshimoto.lovemyself.flight.domain.Flight;

public interface FlightRepository extends JpaRepository<Flight, Integer>{

    @Query("SELECT f FROM Flight f "
    + " WHERE f.departureAirport = :departureAirport "
    + " AND f.arrivalAirport = :arrivalAirport" 
    + " AND f.departureAt >= :now" 
    + " ORDER BY f.departure_at ASC")
    public List<Flight> searchFlights(
        @Param("departureAirport") String departureAirport, 
        @Param("arrivalAirport") String arrivalAirport,
        @Param("now") LocalDateTime now);
}
