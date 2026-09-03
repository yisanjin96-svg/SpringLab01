import type { Airport, FlightOffer, SearchCriteria, SeatInfo } from '../models/flight'

export const AIRPORTS: Airport[] = [
  { code: 'ICN', city: '서울/인천', name: '인천국제공항', country: 'KR' },
  { code: 'GMP', city: '서울/김포', name: '김포국제공항', country: 'KR' },
  { code: 'PUS', city: '부산', name: '김해국제공항', country: 'KR' },
  { code: 'CJU', city: '제주', name: '제주국제공항', country: 'KR' },
  { code: 'NRT', city: '도쿄', name: '나리타국제공항', country: 'JP' },
  { code: 'KIX', city: '오사카', name: '간사이국제공항', country: 'JP' },
  { code: 'HKG', city: '홍콩', name: '홍콩국제공항', country: 'HK' },
  { code: 'BKK', city: '방콕', name: '수완나품국제공항', country: 'TH' },
  { code: 'LAX', city: '로스앤젤레스', name: '로스앤젤레스국제공항', country: 'US' },
  { code: 'CDG', city: '파리', name: '샤를드골공항', country: 'FR' },
]

function airportLabel(code: string): string {
  const a = AIRPORTS.find(x => x.code === code)
  return a ? `${a.city} (${a.code})` : code
}

export { airportLabel }

export const MOCK_FLIGHTS: FlightOffer[] = [
  {
    id: 'LM501',
    outbound: {
      flightNo: 'LM501', airline: 'loveMyself Air',
      originCode: 'ICN', destinationCode: 'NRT',
      departTime: '08:00', arriveTime: '10:20', duration: '2시간 20분',
      aircraft: 'B787-9', stops: 0,
    },
    inbound: null,
    fares: [
      { id: 'LM501-ECO-L', cabinClass: 'ECONOMY', fareName: '일반석 · 알뜰', price: 289000, refundable: false, baggageKg: 15, mileagePercent: 50 },
      { id: 'LM501-ECO-N', cabinClass: 'ECONOMY', fareName: '일반석 · 일반', price: 349000, refundable: true, baggageKg: 23, mileagePercent: 100 },
      { id: 'LM501-PRE', cabinClass: 'PRESTIGE', fareName: '프레스티지', price: 890000, refundable: true, baggageKg: 30, mileagePercent: 150 },
    ],
  },
  {
    id: 'LM213',
    outbound: {
      flightNo: 'LM213', airline: 'loveMyself Air',
      originCode: 'ICN', destinationCode: 'NRT',
      departTime: '13:40', arriveTime: '16:00', duration: '2시간 20분',
      aircraft: 'A350-900', stops: 0,
    },
    inbound: null,
    fares: [
      { id: 'LM213-ECO-L', cabinClass: 'ECONOMY', fareName: '일반석 · 알뜰', price: 265000, refundable: false, baggageKg: 15, mileagePercent: 50 },
      { id: 'LM213-ECO-N', cabinClass: 'ECONOMY', fareName: '일반석 · 일반', price: 325000, refundable: true, baggageKg: 23, mileagePercent: 100 },
      { id: 'LM213-PRE', cabinClass: 'PRESTIGE', fareName: '프레스티지', price: 850000, refundable: true, baggageKg: 30, mileagePercent: 150 },
    ],
  },
  {
    id: 'LM077',
    outbound: {
      flightNo: 'LM077', airline: 'loveMyself Air',
      originCode: 'ICN', destinationCode: 'NRT',
      departTime: '18:55', arriveTime: '21:15', duration: '2시간 20분',
      aircraft: 'B777-300ER', stops: 0,
    },
    inbound: null,
    fares: [
      { id: 'LM077-ECO-L', cabinClass: 'ECONOMY', fareName: '일반석 · 알뜰', price: 302000, refundable: false, baggageKg: 15, mileagePercent: 50 },
      { id: 'LM077-ECO-N', cabinClass: 'ECONOMY', fareName: '일반석 · 일반', price: 368000, refundable: true, baggageKg: 23, mileagePercent: 100 },
      { id: 'LM077-PRE', cabinClass: 'PRESTIGE', fareName: '프레스티지', price: 920000, refundable: true, baggageKg: 30, mileagePercent: 150 },
      { id: 'LM077-FIRST', cabinClass: 'FIRST', fareName: '일등석', price: 1850000, refundable: true, baggageKg: 40, mileagePercent: 200 },
    ],
  },
]

export function findFlightById(id: string): FlightOffer | undefined {
  return MOCK_FLIGHTS.find(f => f.id === id)
}

export function computeSeatExtraFee(cabinClass: 'ECONOMY' | 'PRESTIGE', seatNos: string[]): number {
  const map = generateSeatMap(cabinClass)
  return seatNos.reduce((sum, no) => {
    const seat = map.find(s => s.seatNo === no)
    return sum + (seat?.extraPrice ?? 0)
  }, 0)
}

function datePlus(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

// 페이지에 state 없이 직접 진입했을 때 쓰는 기본값 (목업 단계 편의용)
export const DEFAULT_CRITERIA: SearchCriteria = {
  tripType: 'ROUND',
  originCode: 'ICN',
  destinationCode: 'NRT',
  departDate: datePlus(7),
  returnDate: datePlus(10),
  passengers: { adult: 1, child: 0, infant: 0 },
  cabinClass: 'ECONOMY',
}

const SEAT_COLS = ['A', 'B', 'C', 'D', 'E', 'F']

export function generateSeatMap(cabinClass: 'ECONOMY' | 'PRESTIGE'): SeatInfo[] {
  const rows = cabinClass === 'PRESTIGE' ? [10, 11, 12] : [21, 22, 23, 24, 25, 26]
  const cols = cabinClass === 'PRESTIGE' ? ['A', 'C', 'D', 'F'] : SEAT_COLS
  const occupied = new Set(['22C', '23A', '24D', '11A'])

  const seats: SeatInfo[] = []
  for (const row of rows) {
    for (const col of cols) {
      const seatNo = `${row}${col}`
      const type = col === 'A' || col === cols[cols.length - 1] ? 'WINDOW'
        : (col === 'C' || col === 'D') ? 'AISLE' : 'MIDDLE'
      seats.push({
        seatNo,
        row,
        col,
        cabinClass,
        type,
        available: !occupied.has(seatNo),
        extraPrice: type === 'WINDOW' && cabinClass === 'ECONOMY' ? 15000 : 0,
      })
    }
  }
  return seats
}
