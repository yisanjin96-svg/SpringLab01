package com.hoshimoto.lovemyself.member.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table (name = "member")
@EntityListeners(AuditingEntityListener.class)
public class Member {

    // JPA가 리플렉션이니까 프로텍트여도 접근가능하나 생객체 생성은 막힘.
    protected Member(){
        
    }

public static Member register(String nameKanji, String nameKana, String nameRoma,
    LocalDate birthDate, Gender gender, String telephone, String email, String address) 
{
    Member member = new Member();

    member.nameKanji = nameKanji;
    member.nameKana = nameKana;
    member.nameRoma = nameRoma;
    member.birthDate = birthDate;
    member.gender = gender;
    member.telephone = telephone;
    member.email = email;
    member.address = address;
    member.grade = MemberGrade.REGULAR;
    member.deleted = false;

    return member;
}

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
    
    @Enumerated(EnumType.STRING)
    @Column(name = "member_gender", nullable = false, length = 10)
    private Gender gender;

    @Column(name = "member_telephone", nullable = false, length = 20)
    private String telephone;

    @Column(name = "member_email", nullable = false, length = 255)
    private String email;

    @Column(name = "member_address", nullable = false, length = 255)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_grade", nullable = false, length = 20)
    private MemberGrade grade;

    @Column(name="is_deleted", nullable = false)
    private boolean deleted;

    @CreatedDate 
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

}
