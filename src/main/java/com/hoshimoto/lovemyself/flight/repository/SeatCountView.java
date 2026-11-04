package com.hoshimoto.lovemyself.flight.repository;

import com.hoshimoto.lovemyself.flight.domain.SeatClass;

public interface SeatCountView {

    Long getFlightId();

    SeatClass getSeatClass();

    Long getAvailableCount();
    

    // 1 , ECONOMY, 20
    // 1 , BUSSINESS, 40 의 형태
}
