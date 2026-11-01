import { useState } from 'react'
import type { FocusEvent, KeyboardEvent } from 'react'
import './C1_AirportSelect.css'

// 一覧に表示する空港1件分。共通部品なので feature の型には依存しない
type AirportOption = {
  airportCode: string
  name: string
  city: string
}

type Props = {
  label: string
  airports: AirportOption[]
  value: string                      // 選択中の空港コード（未選択は ''）
  onSelect: (airportCode: string) => void
}

export default function C1_AirportSelect({ label, airports, value, onSelect }: Props) {
  const [open, setOpen] = useState(false)

  // 選択中の空港を「羽田空港 (HND)」の形で表示する
  const selected = airports.find(a => a.airportCode === value)
  const displayText = selected ? `${selected.name} (${selected.airportCode})` : ''

  const handleSelect = (airportCode: string) => {
    onSelect(airportCode)
    setOpen(false)
  }

  // フォーカスがこの部品の外へ移ったら閉じる（一覧の中の移動では閉じない）
  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpen(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    // マウスを乗せる・フォーカスする・タップするで一覧を表示する
    <div
      className="airport-select"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <label className="airport-select-label" htmlFor={`airport-select-${label}`}>{label}</label>
      <input
        id={`airport-select-${label}`}
        className="airport-select-input"
        type="text"
        placeholder="都市名・空港名"
        value={displayText}
        readOnly
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
      />

      {open && (
        // クリックでフォーカスが外れて、選ぶ前に一覧が閉じるのを防ぐ
        <ul className="airport-select-list" onMouseDown={e => e.preventDefault()}>
          {airports.length === 0 && (
            <li className="airport-select-empty">空港がありません</li>
          )}
          {airports.map(a => (
            <li key={a.airportCode}>
              <button
                type="button"
                className={`airport-select-item ${a.airportCode === value ? 'selected' : ''}`}
                onClick={() => handleSelect(a.airportCode)}
              >
                <span className="airport-select-name">{a.name}</span>
                <span className="airport-select-sub">{a.city} · {a.airportCode}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
