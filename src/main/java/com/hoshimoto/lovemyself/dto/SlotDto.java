package com.hoshimoto.lovemyself.dto;

    public class SlotDto {

        private final Long id;
        private final String facilityName;
        private final String startTimeFormatted;
        private final String endTimeFormatted;
        private final boolean reserved;
        private final Long reservedBy;
        private final Long version;

    public SlotDto(Long id, String facilityName, String startTimeFormatted,
                   String endTimeFormatted, boolean reserved, Long reservedBy, Long version) {
        this.id = id;
        this.facilityName = facilityName;
        this.startTimeFormatted = startTimeFormatted;
        this.endTimeFormatted = endTimeFormatted;
        this.reserved = reserved;
        this.reservedBy = reservedBy;
        this.version = version;
    }

    //        왜 @Getter 대신 직접 getter를 다 적었냐 — boolean 필드는 Thymeleaf가 slot.reserved를
    //        읽을 때 isReserved()를 찾는데,
    //        Lombok @Getter도 boolean이면 자동으로 isReserved()를 만들어주긴 해.
    //        그러니 @Getter로 바꿔도 되는데, 지금은 뭐가 자동 생성되는지 명시적으로 보이게 직접 적었어.

    public Long getId() { return id; }
    public String getFacilityName() { return facilityName; }
    public String getStartTimeFormatted() { return startTimeFormatted; }
    public String getEndTimeFormatted() { return endTimeFormatted; }
    public boolean isReserved() { return reserved; }
    public Long getReservedBy() { return reservedBy; }
    public Long getVersion() { return version; }


}