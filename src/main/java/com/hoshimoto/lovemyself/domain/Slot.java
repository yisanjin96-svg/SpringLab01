package com.hoshimoto.lovemyself.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "slot")
@NoArgsConstructor
@Getter
public class Slot {

//  아아디
//  시설아이디
//  슬롯시작시간
//  슬롯끝나는시간
//  예약유무
//  예약자 유저 아이디
//  낙관적 락 컬럼

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "facility_id", nullable = false)
    private Facility facility;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    @Column(nullable = false)
    private boolean reserved = false;

    private Long reservedBy;

    @Version
    private Long version;

    public Slot(Facility facility, LocalDateTime startTime, LocalDateTime endTime)
    {
        this.facility = facility;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public void reseve(Long userId) {
        if (this.reserved) {
            throw  new IllegalStateException("既に予約した「施設」です。");
        }
        this.reserved = true;
        this.reservedBy = userId;
    }

    public void cancel() {
        this.reserved = false;
        this.reservedBy = null;
    }

}
