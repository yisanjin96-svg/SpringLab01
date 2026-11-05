package com.hoshimoto.lovemyself.flight.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hoshimoto.lovemyself.flight.domain.Seat;
import com.hoshimoto.lovemyself.flight.domain.SeatStatus;

public interface SeatRepository extends JpaRepository<Seat, Long> {

    @Query ("SELECT s.flight.id AS flightId, s.seatClass AS seatClass, COUNT(s) AS availableCount"
        + " FROM Seat s"
        + " WHERE s.flight.id IN :flightIds"
        + " AND s.status = :status"
        + " GROUP BY s.flight.id, s.seatClass")
    List<SeatCountView> countAvailableSeats(@Param("flightIds") List<Long> flightIds,
                                            @Param ("status") SeatStatus status);

}