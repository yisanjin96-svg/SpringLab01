package com.hoshimoto.lovemyself.flight.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hoshimoto.lovemyself.flight.domain.Flight;
import com.hoshimoto.lovemyself.flight.dto.FlightResponse;
import com.hoshimoto.lovemyself.flight.repository.FlightRepository;

/**
 * 클린 아키텍처 20장 "유스케이스": 항공편 검색 흐름을 조율하고, 엔티티를 응답 DTO로 변환한다.
 */
@Service
public class FlightService {

    private final FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @Transactional(readOnly = true)
    public List<FlightResponse> searchFlights(String departureAirport, String arrivalAirport) {
        List<Flight> flights = flightRepository.searchFlights(
            departureAirport,
            arrivalAirport,
            LocalDateTime.now());

        return flights.stream()
            .map(flight -> new FlightResponse(
                flight.getId(),
                flight.getFlightNumber(),
                flight.getDepartureAirport(),
                flight.getArrivalAirport(),
                flight.getDepartureAt(),
                flight.getArrivalAt()))
            .toList();
    }
}
