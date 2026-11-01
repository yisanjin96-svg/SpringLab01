package com.hoshimoto.lovemyself.flight.domain;

/**
 * 항공편 좌석의 등급 구분 (ECONOMY: 일반석, BUSINESS: 비즈니스석).
 *
 * <p>Effective Java 아이템 34 "열거 타입": 등급별로 운임과 남은 좌석을 나누는 기준값이라
 * 이 두 값 외에는 들어오면 안 되므로 Enum으로 고정한다.
 */
public enum SeatClass {
    ECONOMY,
    BUSINESS
}

/**
 * 왜 ENUM 클래스를 도메인에 두었는가?
 * 현재 아키텍쳐 흐름은 controller → service → repository → domain 의 흐름으로
 * 엔티티와 직접적인 연관이 있기 때문에.
 * Seat라는 엔티티가 Enum을 필드의 타입으로 사용하기 때문에 domain 영역이 맞다.
 */