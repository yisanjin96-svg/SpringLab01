import { SEAT_CLASS_LABEL, calculateTotal, formatYen } from '../fare'
import type { SelectedFare } from '../types'

type Props = {
  isRoundtrip: boolean
  outbound: SelectedFare | null
  inbound: SelectedFare | null
  adults: number
  onNext: () => void
}

// 選択中の便を1行で表示する
function selectionLabel(selected: SelectedFare | null) {
  if (!selected) {
    return '未選択'
  }
  return `${selected.flightNumber} ${SEAT_CLASS_LABEL[selected.seatClass]}`
}

/**
 * X2 選択内容バー（画面の下に固定）。選んだ便・合計金額・次へボタンを表示する。
 * クリーンアーキテクチャ 22章 : 親から受け取った選択内容を表示するだけ
 */
export default function X2_SelectionBar({ isRoundtrip, outbound, inbound, adults, onNext }: Props) {
  // 片道なら往路だけ、往復なら往路・復路の両方を選ぶと次へ進める
  const canNext = outbound !== null && (!isRoundtrip || inbound !== null)
  const total = calculateTotal(outbound, inbound, adults)

  return (
    <div className="selection-bar">
      <div className="selection-bar-inner">
        <dl className="selection-list">
          <div>
            <dt>往路</dt>
            <dd>{selectionLabel(outbound)}</dd>
          </div>
          {isRoundtrip && (
            <div>
              <dt>復路</dt>
              <dd>{selectionLabel(inbound)}</dd>
            </div>
          )}
          <div>
            <dt>合計（大人{adults}名）</dt>
            <dd className="selection-total">{formatYen(total)}</dd>
          </div>
        </dl>
        <button type="button" className="selection-next-btn" disabled={!canNext} onClick={onNext}>
          次へ
        </button>
      </div>
    </div>
  )
}
