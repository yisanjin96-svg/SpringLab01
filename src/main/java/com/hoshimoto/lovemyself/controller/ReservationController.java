package com.hoshimoto.lovemyself.controller;

import com.hoshimoto.lovemyself.domain.Slot;
import com.hoshimoto.lovemyself.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<Slot>> getSlots(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end
        ) {
        List<Slot> slots = reservationService.getSlotsBetween(start, end);
        // Lazyかけたから、多分Facility部分にエラー
        // InvalidDefinitionException (Jackson com.fasterxml.jackson.databind.exc.InvalidDefinitionException)
        // javaObject ➞ JSON シリアライズができないの、笑笑
        // 設計意図 : FaciltyでLAZYを掛けたのは正しい判断だと思います。（不必要なEAGERLOADINGを塞ぐ為）
        // でDTOを使うもう一つの理由ではないか～？
        return ResponseEntity.ok(slots);
    }
}
