package com.hoshimoto.lovemyself.airport.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hoshimoto.lovemyself.airport.domain.Airport;

/**
 * 클린 아키텍처 23장 "데이터베이스 게이트웨이": DB 접근을 인터페이스 뒤로 숨겨 service가 DB 구현 세부사항에 의존하지 않게 한다.
 */
public interface AirportRepository extends JpaRepository<Airport,String> {

    // @Query > JPQL 
    // DB 테이블이 아니라 Java 엔티티 클래스를 대상으로 쓰는 쿼리입니다. 실행할 때 Hibernate가 진짜 SQL로 바꿔 줍니다.

    // ASC: 1→2→3, 
    // A→Z (DESC는 반대) FUK → HND → ICN
    @Query("SELECT a FROM Airport a ORDER BY a.airportCode ASC")
    List<Airport> findAllAirports();

}
