package com.hoshimoto.lovemyself.airport.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoshimoto.lovemyself.airport.dto.AirportResponse;
import com.hoshimoto.lovemyself.airport.service.AirportService;

@RestController
@RequestMapping("/api/airports")
public class AirportController {
 
    private final AirportService airportService;

    public  AirportController(AirportService airportService) {
        this.airportService = airportService;
    }

    @GetMapping 
    public ResponseEntity<List<AirportResponse>> findAllAirports() {
        return ResponseEntity.ok(airportService.findAllAirports());
    }
    // ResponseEntity : RES全体 -> (状態コード　+ ヘッダー + ボディ)
    // ResponseEntity <List<AirportResponse>>치면 Spirng(Jackson)이 JSON으로 바꿔 줌
    //  return ResponseEntity.badRequest().body() など
}
