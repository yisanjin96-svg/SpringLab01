import type { FareOption, FlightOffer } from '../../models/flight'
import { airportLabel } from '../../mock/mockData'
import { COLORS } from '../../styles/colors'

interface BookingSummaryPanelProps {
  flight: FlightOffer
  fare: FareOption
  passengerCount: number
  seatCount?: number
  extraFee?: number
}

export default function BookingSummaryPanel({ flight, fare, passengerCount, seatCount = 0, extraFee = 0 }: BookingSummaryPanelProps) {
  const seg = flight.outbound
  const subtotal = fare.price * passengerCount
  const total = subtotal + extraFee

  return (
    <div style={{
      background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10,
      padding: 20, position: 'sticky', top: 84, minWidth: 260,
    }}>
      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: COLORS.navy, marginBottom: 12 }}>
        예약 요약
      </div>

      <div style={{ fontSize: '0.82rem', color: COLORS.text, marginBottom: 4 }}>
        {airportLabel(seg.originCode)} → {airportLabel(seg.destinationCode)}
      </div>
      <div style={{ fontSize: '0.72rem', color: COLORS.textSub, marginBottom: 14 }}>
        {seg.flightNo} · {seg.departTime} - {seg.arriveTime}
      </div>

      <Row label={`운임 (${fare.fareName})`} value={`${fare.price.toLocaleString()}원`} />
      <Row label={`탑승객 ${passengerCount}명`} value={`× ${passengerCount}`} />
      {seatCount > 0 && <Row label="좌석 선택" value={`${seatCount}석`} />}
      {extraFee > 0 && <Row label="추가 좌석 요금" value={`${extraFee.toLocaleString()}원`} />}

      <div style={{ borderTop: `1px solid ${COLORS.border}`, marginTop: 12, paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: COLORS.text }}>총 결제금액</span>
        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: COLORS.navy }}>{total.toLocaleString()}원</span>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
      <span style={{ fontSize: '0.76rem', color: COLORS.textSub }}>{label}</span>
      <span style={{ fontSize: '0.76rem', color: COLORS.text }}>{value}</span>
    </div>
  )
}
