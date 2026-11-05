package com.hoshimoto.lovemyself.flight.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hoshimoto.lovemyself.flight.domain.FlightFare;

public interface FlightFareRepository extends JpaRepository<FlightFare, Long> {

    @Query (" SELECT ff FROM FlightFare ff WHERE ff.flight.id IN :flightIds")
    List<FlightFare> findByFlightIds(@Param("flightIds") List<Long> flightIds);
}

// JPQL =>  FlightFare ff 약어 ? 테이블이름이 아니라 엔티티 객체 사용
// ff.flight.id : 자바 필드 사용 FlightFare의 flight.Id
// ff(fare의) -> flight 의 -> FK -> id 를 지정  >> Flight flight 객체로 선언해서 ff.flight.id로 써야한다.

// IN :filghtIds" 에 ID 목록이 들어간다 파라미터니까
// ff 컬럼 고르지 않고 FlightFare 통째로 셋 

// 자바에서는 객체끼리 참조하는 게 자연스러우니 익숙해질것 운임 엔티티의 플라이트
// @ManyToOne 으로 플라이트가 적용되어 있는데
    // 운임기준 여러 행이 하나의 항공편이 속해 있어
    // N : 1 의 관계 

// // 개웃긴게 그냥 SELECT * FROM WHERE flightfare.fightId 아닌가
// 7. FlightFareRepository에 편 ID 목록으로 운임을 찾는 @Query를 작성한다.