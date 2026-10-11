package com.hoshimoto.lovemyself.airport.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoshimoto.lovemyself.airport.dto.AirportResponse;
import com.hoshimoto.lovemyself.airport.service.AirportService;

/**
 * 클린 아키텍처 22장 "인터페이스 어댑터": HTTP 요청을 유스케이스 호출로 바꾸고, 결과를 응답 DTO로 돌려준다.
 */
@RestController
@RequestMapping("/api/airports")
public class AirportController {
 
    private final AirportService airportService;

    public AirportController(AirportService airportService) {
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
