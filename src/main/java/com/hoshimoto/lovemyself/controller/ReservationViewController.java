package com.hoshimoto.lovemyself.controller;

import com.hoshimoto.lovemyself.dto.SlotDto;
import com.hoshimoto.lovemyself.repository.SlotRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ReservationViewController {

    private final SlotRepository slotRepository;

    public ReservationViewController(SlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    @GetMapping("/")
    public String showSlots(Model model) {
        List<SlotDto> slots = slotRepository.findAll().stream()
                .map(slot -> new SlotDto(
                        slot.getId(),
                        slot.getFacility().getName(),
                        slot.getStartTime().toLocalTime().toString(),
                        slot.getEndTime().toLocalTime().toString(),
                        slot.isReserved(),
                        slot.getReservedBy(),
                        slot.getVersion()
                ))
                .toList();
        model.addAttribute("slots", slots);
        return "index";
    }
}
