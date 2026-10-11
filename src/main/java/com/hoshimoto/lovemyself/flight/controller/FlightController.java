package com.hoshimoto.lovemyself.flight.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoshimoto.lovemyself.flight.dto.FlightResponse;
import com.hoshimoto.lovemyself.flight.service.FlightService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController 
@RequestMapping ("/api/flights")
public class FlightController {
    
    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping
    public ResponseEntity<List<FlightResponse>> searchFlights(@RequestParam String departureAirport,@RequestParam String arrivalAirport) {
        return ResponseEntity.ok(flightService.searchFlights(departureAirport, arrivalAirport));
    }
    
}
