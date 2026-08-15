package com.hoshimoto.lovemyself.config;

import com.hoshimoto.lovemyself.domain.Facility;
import com.hoshimoto.lovemyself.domain.Slot;
import com.hoshimoto.lovemyself.repository.FacilityRepository;
import com.hoshimoto.lovemyself.repository.SlotRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    /**
     * アプリ起動時に初期データを投入する。
     * スロットが既に存在する場合は何もしない（再起動時の重複防止）。
     */
    @Bean
    public CommandLineRunner initData(FacilityRepository facilityRepository,
                                      SlotRepository slotRepository) {
        return args -> {
            // 既にデータがあればスキップ
            if (slotRepository.count() > 0) {
                return;
            }

            // 施設を登録
            Facility room1 = facilityRepository.save(new Facility("会議室1号", 10));
            Facility room2 = facilityRepository.save(new Facility("会議室2号", 6));

            // 明日の10時〜13時、1時間刻みのスロットを生成
            LocalDateTime base = LocalDate.now().plusDays(1).atTime(10, 0);
            for (int i = 0; i < 3; i++) {
                slotRepository.save(new Slot(room1, base.plusHours(i), base.plusHours(i + 1)));
                slotRepository.save(new Slot(room2, base.plusHours(i), base.plusHours(i + 1)));
            }
        };
    }
}