import { SEAT_CLASS_LABEL, formatYen, seatStatusLabel } from '../fare'
import type { FlightFareResponse } from '../types'

type Props = {
  fare: FlightFareResponse
  selected: boolean
  onSelect: () => void
}

/**
 * X2 運賃セル（座席クラス1つ分）。押すとこの便・この運賃を選ぶ。
 * クリーンアーキテクチャ 22章 : 表示とクリックの受付だけを行い、選択の状態は親が持つ
 */
export default function X2_FareCell({ fare, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      className={`fare-cell ${selected ? 'selected' : ''}`}
      aria-pressed={selected}
      disabled={fare.availableSeats === 0}
      onClick={onSelect}
    >
      <span className="fare-class">{SEAT_CLASS_LABEL[fare.seatClass]}</span>
      <span className="fare-amount">{formatYen(fare.amount)}</span>
      <span className="fare-seats">{seatStatusLabel(fare.availableSeats)}</span>
    </button>
  )
}
