package com.hoshimoto.lovemyself.flight.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hoshimoto.lovemyself.common.exception.BusinessException;
import com.hoshimoto.lovemyself.common.exception.ErrorCode;
import com.hoshimoto.lovemyself.flight.domain.Flight;
import com.hoshimoto.lovemyself.flight.domain.FlightFare;
import com.hoshimoto.lovemyself.flight.domain.SeatStatus;
import com.hoshimoto.lovemyself.flight.dto.FlightResponse;
import com.hoshimoto.lovemyself.flight.repository.FlightFareRepository;
import com.hoshimoto.lovemyself.flight.repository.FlightRepository;
import com.hoshimoto.lovemyself.flight.repository.SeatCountView;
import com.hoshimoto.lovemyself.flight.repository.SeatRepository;

/**
 * 클린 아키텍처 20장 "유스케이스": 항공편 검색 흐름을 조율하고, 엔티티를 응답 DTO로 변환한다.
 */
@Service
public class FlightService {

    private final FlightRepository flightRepository;
    private final FlightFareRepository flightFareRepository;
    private final SeatRepository seatRepository;

    public FlightService(FlightRepository flightRepository,
        FlightFareRepository flightFareRepository,
        SeatRepository seatRepository
    ) {
        this.flightRepository = flightRepository;
        this.flightFareRepository = flightFareRepository;
        this.seatRepository = seatRepository;
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

        // 검색 조건으로 편 조회하기
        List<Flight> flights = flightRepository.searchFlights(
            departureAirport,
            arrivalAirport,
            from,
            to,
            LocalDateTime.now());

        // 항공편이 빈값일경우 이 행에서 List.of()로 리턴하기
        if (flights.isEmpty()) {
            return List.of();
        }

        // List로 flight객체만 stream.map으로 조회해서 아이디받기
        List<Long> flightIds = flights.stream().map(Flight::getId).toList();

        // 운임 조회 -> 편ID -> 운임목록 Map으로 바꾼다.
        // 맵<키 , 값>
        // 이 맵에서 무엇으로 찾을지에 대한 키Key가 Long인거고 , 그 값이 리스트<플라이트페어> 라는거다.
        // faresByFlightId.get(10L) 를 하면 > List<FlightFare>의 형태가 나오는거고 
        Map<Long, List<FlightFare>> faresByFlightId = 
        flightFareRepository.findByFlightIds(flightIds) // List<FlightFare>
            .stream()  // 스트림
            // 그룹화한다가 메인이고 / 안은 어떤것을 기준으로의 이해가 맞을듯 
            .collect(Collectors.groupingBy(
                fare -> fare.getFlight().getId()
            ));
            // 이 컬렉트는 스트림에 흘러가는 요소를 모아서 하나의 결과물로 만드는 마지막 처리
            // collect 아츠메로- , 도우에츠메루노카시지 
            // 여기서는 편ID로 묵어서 Map으로 만들어라 라는 말임.
            // groupingBy는 원래 항상 Map을 만들어 반환하는 변환 메서드이고 Map으로 변환해주는거고 Map<Long, List<FlgithFare>>선어는 그 반환값을 받기 위해 선언한 용도

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
