package com.hoshimoto.lovemyself.airport.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hoshimoto.lovemyself.airport.domain.Airport;
import com.hoshimoto.lovemyself.airport.dto.AirportResponse;
import com.hoshimoto.lovemyself.airport.repository.AirportRepository;

/**
 * 클린 아키텍처 20장 "유스케이스": 공항 목록 조회 흐름을 조율하고, 엔티티를 응답 DTO로 변환한다.
 */
@Service 
public class AirportService {
    // 1.repoから空港LISTを取得する。
    // 2.LIST＜AIRPORT＞を＜AIRPORTRESONSE＞に変換する。
    // 3.戻り値が０件の場合、空リストを渡す。

    private final AirportRepository airportRepository;

    public AirportService(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    @Transactional (readOnly = true)
    public List<AirportResponse> findAllAirports() {
        List<Airport> airports = airportRepository.findAllAirports();

        return airports.stream()
            .map(airport -> new AirportResponse(
                airport.getAirportCode(), 
                airport.getName(), 
                airport.getCity()))
            .toList();
    }

}
