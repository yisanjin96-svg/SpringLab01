package com.hoshimoto.lovemyself.flight.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoshimoto.lovemyself.flight.dto.FlightResponse;
import com.hoshimoto.lovemyself.flight.service.FlightService;

import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
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

    // GET・API
    @GetMapping
    // 公開できる、レスポンスエンティティとしてもらう、タイプはFlightResponse
    public ResponseEntity<List<FlightResponse>> searchFlights(
        // リクエストのdepautreAirportが大文字ではなければ、エラーを投げる
        @RequestParam @Pattern(regexp = "^[A-Z]{3}$") String departureAirport,
        // リクエストのarrivalAirportが大文字ではなければ、エラーを投げる
        @RequestParam @Pattern(regexp = "^[A-Z]{3}$") String arrivalAirport,
        // 往復の復路はフロントが空港を逆にして復路日で同じAPIをもう一度呼ぶ
        @RequestParam @DateTimeFormat (iso = DateTimeFormat.ISO.DATE) LocalDate departureDate
    )
    {
        return ResponseEntity.ok(flightService.searchFlights(departureAirport, arrivalAirport, departureDate));
    }
    
}
