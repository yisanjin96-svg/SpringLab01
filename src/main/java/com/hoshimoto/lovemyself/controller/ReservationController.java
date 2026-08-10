package com.hoshimoto.lovemyself.controller;

import com.hoshimoto.lovemyself.dto.SlotDto;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDateTime;
import java.util.List;

@Controller
public class ReservationController {

    // TODO: 엔티티 연결 후 Repository/Service로 교체
    private static final List<SlotDto> DUMMY_SLOTS = List.of(
        new SlotDto(1L, "회의실 A", LocalDateTime.of(2026, 8, 11, 9, 0), LocalDateTime.of(2026, 8, 11, 10, 0), false, null, 0L),
        new SlotDto(2L, "회의실 A", LocalDateTime.of(2026, 8, 11, 10, 0), LocalDateTime.of(2026, 8, 11, 11, 0), true,  1001L, 1L),
        new SlotDto(3L, "회의실 B", LocalDateTime.of(2026, 8, 11, 13, 0), LocalDateTime.of(2026, 8, 11, 14, 0), false, null, 0L),
        new SlotDto(4L, "회의실 B", LocalDateTime.of(2026, 8, 11, 14, 0), LocalDateTime.of(2026, 8, 11, 15, 0), false, null, 0L),
        new SlotDto(5L, "체육관",  LocalDateTime.of(2026, 8, 11, 10, 0), LocalDateTime.of(2026, 8, 11, 12, 0), true,  1002L, 2L)
    );

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("slots", DUMMY_SLOTS);
        return "index";
    }

    @PostMapping("/reserve")
    public String reserve(@RequestParam Long slotId,
                          @RequestParam Long userId,
                          RedirectAttributes ra) {
        // TODO: 엔티티 연결 후 slotService.reserve(slotId, userId) 호출
        ra.addFlashAttribute("message", "슬롯 " + slotId + " 예약 요청 전송 (더미)");
        return "redirect:/";
    }
}
