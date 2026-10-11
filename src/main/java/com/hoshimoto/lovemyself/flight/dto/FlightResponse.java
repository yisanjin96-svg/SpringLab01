package com.hoshimoto.lovemyself.flight.dto;

import java.time.LocalDateTime;

/**
 * 클린 아키텍처 22장 "경계를 횡단하는 데이터": 엔티티를 그대로 내보내지 않고, 단순한 데이터 구조로 경계를 넘긴다.
 */
public class FlightResponse {

    private final Long id;
    private final String flightNumber;
    private final String departureAirport;
    private final String arrivalAirport;
    private final LocalDateTime departureAt;
    private final LocalDateTime arrivalAt;

    public FlightResponse(Long id, String flightNumber, String departureAirport,
            String arrivalAirport, LocalDateTime departureAt, LocalDateTime arrivalAt) {
        this.id = id;
        this.flightNumber = flightNumber;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.departureAt = departureAt;
        this.arrivalAt = arrivalAt;
    }

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
