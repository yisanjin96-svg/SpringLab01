package com.hoshimoto.lovemyself.service;

import com.hoshimoto.lovemyself.domain.Slot;
import com.hoshimoto.lovemyself.repository.SlotRepository;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReservationService {
    private final SlotRepository slotRepository;

    public ReservationService(SlotRepository slotRepository){
        this.slotRepository = slotRepository;
    }


    @Transactional
    public void reserveSlot(Long slotId, Long userId) {
        Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new IllegalArgumentException("存在してないスロットです。"));
        try {
            slot.reserve(userId);
            slotRepository.save(slot);
        } catch (ObjectOptimisticLockingFailureException e) {
            throw new IllegalStateException("他のユーザーが、先に予約を取れました。もう一度試してください。");
        }
    }

    public void cancelReserveSlot(Long slotId, Long userId) {
        Slot slot = slotRepository.findById(slotId).orElseThrow(()->
                new IllegalArgumentException("存在してないスロットです。"));
            slot.cancel();
            slotRepository.save(slot);
    }

}
