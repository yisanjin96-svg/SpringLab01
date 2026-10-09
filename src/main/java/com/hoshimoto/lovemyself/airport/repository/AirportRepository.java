package com.hoshimoto.lovemyself.airport.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hoshimoto.lovemyself.airport.domain.Airport;

public interface AirportRepository extends JpaRepository<Airport, String>{

    @Query("SELECT a FROM Airport a ORDER BY a.airportCode ASC")
    List<Airport> findAllAirportId();

}
