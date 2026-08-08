package com.hoshimoto.lovemyself.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "facility")
@Getter
@NoArgsConstructor
//NoArgsConstructor パラメータがないのコンストラクタ自動で生成する。
//JPAは内部的にオブジェクトを作る時、空いてるコンストラクタが必要。
//Setterはわざと入れてない、Getterだけおいて値変更は別途のメソッドに強制させる意図。
public class Facility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // GenerationType.IDENTITY FK자동채번
    // 例1
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer capacity;

    // 例2
    public Facility(String name, Integer capacity) {
        this.name = name;
        this.capacity = capacity;
    }
}
