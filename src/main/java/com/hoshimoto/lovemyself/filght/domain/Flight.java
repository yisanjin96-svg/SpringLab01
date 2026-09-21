package com.hoshimoto.lovemyself.filght.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.hoshimoto.lovemyself.member.domain.Gender;
import com.hoshimoto.lovemyself.member.domain.MemberGrade;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;


@Entity
@Table (name="fight")
@EntityListeners(AuditingEntityListener.class)
public class Flight {

    protected Flight(){}
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "member_name_kanji", length = 50)
    private String nameKanji;

    @Column(name = "member_name_kana", nullable = false, length = 50)
    private String nameKana;

    @Column(name = "member_name_roma", nullable = false, length = 100)
    private String nameRoma;

    /** 生年月日。小児運賃の判定に使用する */
    @Column(name = "member_birth_date", nullable = false)
    private LocalDate birthDate;
    
    // @Enumerated(EnumType.STRING)
    // @Column(name = "member_gender", nullable = false, length = 10)
    // private Gender gender;

    @Column(name = "member_telephone", nullable = false, length = 20)
    private String telephone;

    @Column(name = "member_email", nullable = false, length = 255)
    private String email;

    @Column(name = "member_address", nullable = false, length = 255)
    private String address;

    // @Enumerated(EnumType.STRING)
    // @Column(name = "member_grade", nullable = false, length = 20)
    // private MemberGrade grade;

    @Column(name="is_deleted", nullable = false)
    private boolean deleted;

    @CreatedDate 
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

}
