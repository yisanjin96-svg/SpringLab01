package com.hoshimoto.lovemyself.controller;

import com.hoshimoto.lovemyself.dto.SlotDto;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ReservationViewController {

    @GetMapping("/")
    public  String showSlots(Model model){
        List<SlotDto> dummySlots = List.of(
                new SlotDto(1L, "会議室1号", "10:00", "11:00", false, null, 0L),
                new SlotDto(2L, "会議室1号", "11:00", "12:00", true, 1001L, 1L),
                new SlotDto(3L, "会議室2号", "10:00", "11:00", false, null, 0L)
        );
        model.addAttribute("slots", dummySlots);
        return "index";
    }
}
