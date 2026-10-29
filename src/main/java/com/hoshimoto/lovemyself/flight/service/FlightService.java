package com.hoshimoto.lovemyself.flight.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hoshimoto.lovemyself.common.exception.BusinessException;
import com.hoshimoto.lovemyself.common.exception.ErrorCode;
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
    public List<FlightResponse> searchFlights(String departureAirport, String arrivalAirport, LocalDate departureDate) {

        // 항공편 서비스 메서드 -> 입력값으로 출발지와 도착지를 선택한다.
        // 출발지=도착지가 같으면 ER002 예외를 던진다 → GlobalExceptionHandler가 받아서 400으로 응답
        if(departureAirport.equals(arrivalAirport)){          // 【2】 업무 규칙 검사
            throw new BusinessException(ErrorCode.ER002);     // 【3】 신고서를 만들어 위로 던짐 → 【4】
        }
        
        LocalDateTime from = departureDate.atStartOfDay();
        /* atStartOfDay(): 日に時分を付けてLocalDateTimeに変更する
        （2026-10-20）→ （2026-10-20T00:00） */
        LocalDateTime to = departureDate.plusDays(1).atStartOfDay();

        List<Flight> flights = flightRepository.searchFlights(
            departureAirport,
            arrivalAirport,
            from,
            to,
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
