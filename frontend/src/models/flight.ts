// 목업 단계 데이터바인딩 모델
// 실제 Entity/API 연동 전까지 화면은 이 타입 + src/mock 데이터만 바라본다.

export type CabinClass = 'ECONOMY' | 'PRESTIGE' | 'FIRST'

export type TripType = 'ROUND' | 'ONEWAY'

export interface Airport {
  code: string
  city: string
  name: string
  country: string
}

export interface PassengerCount {
  adult: number
  child: number
  infant: number
}

export interface SearchCriteria {
  tripType: TripType
  originCode: string
  destinationCode: string
  departDate: string // yyyy-MM-dd
  returnDate: string | null
  passengers: PassengerCount
  cabinClass: CabinClass
}

export interface FlightSegment {
  flightNo: string
  airline: string
  originCode: string
  destinationCode: string
  departTime: string // HH:mm
  arriveTime: string // HH:mm
  duration: string   // "2시간 10분"
  aircraft: string
  stops: number
}

export interface FareOption {
  id: string
  cabinClass: CabinClass
  fareName: string      // 예: 일반석 · 알뜰
  price: number
  refundable: boolean
  baggageKg: number
  mileagePercent: number
}

export interface FlightOffer {
  id: string
  outbound: FlightSegment
  inbound: FlightSegment | null
  fares: FareOption[]
}

export type PassengerType = 'ADULT' | 'CHILD' | 'INFANT'

export interface PassengerInfo {
  id: string
  type: PassengerType
  givenName: string
  familyName: string
  birthDate: string
  gender: 'M' | 'F'
  nationality: string
  passportNo: string
}

export type SeatType = 'WINDOW' | 'MIDDLE' | 'AISLE'

export interface SeatInfo {
  seatNo: string
  row: number
  col: string
  cabinClass: CabinClass
  type: SeatType
  available: boolean
  extraPrice: number
}

export interface PaymentInfo {
  method: 'CARD' | 'BANK_TRANSFER'
  cardNumber: string
  expiry: string
  installment: number
  cardHolder: string
}

export interface BookingDraft {
  criteria: SearchCriteria
  flight: FlightOffer
  fare: FareOption
  passengers: PassengerInfo[]
  seats: string[]
}

export interface BookingConfirmation {
  pnr: string
  bookedAt: string
  totalPrice: number
  draft: BookingDraft
}
