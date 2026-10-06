@Entity
@Table(name = "tableName")
@EntityListeners(AuditingEntityListener.class)
@Id + @GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "Colum_name")
@Enumerated(EnumType.STRING)     ← grade, gender
@CreatedDate / @LastModifiedDate