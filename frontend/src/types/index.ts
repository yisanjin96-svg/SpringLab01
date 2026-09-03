// Java SlotDto 매핑
export interface Flight {
  id: number
  facilityName: string       // 항공편명 (ex. 会議室1号 → 노선으로 표시)
  startTimeFormatted: string // 출발 시각
  endTimeFormatted: string   // 도착 시각
  reserved: boolean
  reservedBy: number | null
  version: number
}
