package com.hoshimoto.lovemyself.controller;

import com.hoshimoto.lovemyself.domain.Slot;
import com.hoshimoto.lovemyself.dto.SlotDto;
import com.hoshimoto.lovemyself.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
public class ReservationController {

    private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("MM/dd HH:mm");

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService){
        this.reservationService = reservationService;
    }

    @PostMapping("/{slotId}/reserve")
    public ResponseEntity<Void> reserve(@PathVariable Long slotId, @RequestParam Long userId){
        reservationService.reserveSlot(slotId, userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{slotId}/cancel")
    public ResponseEntity<Void> cancel(@PathVariable Long slotId, @RequestParam Long userId){
        reservationService.cancelReserveSlot(slotId, userId);
        return ResponseEntity.ok().build();
    }

    // Slot → SlotDto 変換でLazy問題を解決
    // Facility は Lazy なので、トランザクション内で触れる Service 層か、
    // ここで DTO にマッピングすることで Jackson のシリアライズエラーを回避
    @GetMapping
    public ResponseEntity<List<SlotDto>> getSlots(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end
    ) {
        List<SlotDto> dtos = reservationService.getSlotsBetween(start, end)
                .stream()
                .map(this::toDto)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    private SlotDto toDto(Slot slot) {
        return new SlotDto(
                slot.getId(),
                slot.getFacility().getName(),
                slot.getStartTime().format(FMT),
                slot.getEndTime().format(FMT),
                slot.isReserved(),
                slot.getReservedBy(),
                slot.getVersion()
        );
    }
}
