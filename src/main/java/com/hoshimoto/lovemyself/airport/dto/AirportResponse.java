package com.hoshimoto.lovemyself.airport.dto;

public class AirportResponse {
 
    private final String airportCode;
    private final String name;
    private final String city;

    public AirportResponse(String airportCode, String name, String city){
        this.airportCode = airportCode;
        this.name = name;
        this.city = city;
    }

    public String getAirportCode() {
        return airportCode;
    }

    public String getName() {
        return name;
    }

    public String getCity() {
        return city;
    }

    // DTOでエンティティを呼び出ししない。
    // Entity➝DTOに変えるのは、サービスでする。
    // final은 값이 한번 정해지면 바뀌지 않도록 -> 시도가 있을시 컴파일 에러
    // 생성자 -> 객체를 만드는 통로 -> final은 생성자에서만 안에서만 값을 넣을 수 있음. -> 생성자는 그 딱한번의 기회
    // 생성자에 선언된 매게변수가 전부 선언되어야 객체 생성이 완료 됌.
    // this.name 필드 = name 생성자 매개변수 값.
}
