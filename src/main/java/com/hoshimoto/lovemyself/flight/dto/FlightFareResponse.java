package com.hoshimoto.lovemyself.flight.dto;

import java.util.List;

import com.hoshimoto.lovemyself.flight.domain.SeatClass;

public class FlightFareResponse {

    private final SeatClass seatClass;
    private final Integer amount;
    private final Long availableSeats;
    private final List<FlightFareResponse> fares;

    public FlightFareResponse(SeatClass seatClass, Integer amount, Long availableSeats, List<FlightFareResponse> fares)
    {
        this.seatClass = seatClass;
        this.amount = amount;
        this.availableSeats = availableSeats;
        this.fares = fares;
    }
    
    public SeatClass getSeatClass() {
        return seatClass;
    }
    public Integer getAmount() {
        return amount;
    }
    public Long getAvailableSeats() {
        return availableSeats;
    }
    
    public List<FlightFareResponse> fares() {
        return fares;
    }
}
