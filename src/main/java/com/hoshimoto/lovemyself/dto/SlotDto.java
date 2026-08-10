package com.hoshimoto.lovemyself.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@AllArgsConstructor
public class SlotDto {

    private Long id;
    private String facilityName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean reserved;
    private Long reservedBy;
    private Long version;

    public String getStartTimeFormatted() {
        return startTime.format(DateTimeFormatter.ofPattern("MM/dd HH:mm"));
    }

    public String getEndTimeFormatted() {
        return endTime.format(DateTimeFormatter.ofPattern("HH:mm"));
    }
}
