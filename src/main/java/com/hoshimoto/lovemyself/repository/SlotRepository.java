package com.hoshimoto.lovemyself.repository;

import com.hoshimoto.lovemyself.domain.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SlotRepository extends JpaRepository<Slot, Long> {

// Spirng Data JPA는 Inteface만정의하면 구현체를 자동으로 만들준다.
// JpaRepository<Slot, Long> 를 상속하면 기본 CRUD메서드 사용가능(SQL)
//   <> 다룰 ENTITY, PK

}
