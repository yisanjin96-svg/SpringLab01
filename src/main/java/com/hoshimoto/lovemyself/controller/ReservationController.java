package com.hoshimoto.lovemyself.controller;

import com.hoshimoto.lovemyself.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/slots")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService){
        this.reservationService = reservationService;
    }

    @PostMapping("/{slotId}/reserve")
    public ResponseEntity<Void> reserve(@PathVariable Long slotId, @RequestParam Long userId){
        reservationService.reserveSlot(slotId, userId);
        return  ResponseEntity.ok().build();
    }

    @PostMapping("/{slotId}/cancel")
    public ResponseEntity<Void> cancel(@PathVariable Long slotId, @RequestParam Long userId){
        reservationService.cancelReserveSlot(slotId, userId);
        return ResponseEntity.ok().build();
    }

}
