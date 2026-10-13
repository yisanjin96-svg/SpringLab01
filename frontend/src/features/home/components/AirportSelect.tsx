import { useState } from 'react'

// 一覧に表示する空港1件分（バックエンドの AirportResponse と同じフィールド）
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

export default function AirportSelect({ label, airports, value, onSelect }: Props) {
  const [open, setOpen] = useState(false)

  // 選択中の空港を「羽田空港 (HND)」の形で表示する
  const selected = airports.find(a => a.airportCode === value)
  const displayText = selected ? `${selected.name} (${selected.airportCode})` : ''

  const handleSelect = (airportCode: string) => {
    onSelect(airportCode)
    setOpen(false)
  }

  return (
    // マウスがセルに乗っている間だけ一覧を表示する
    <div
      className="search-cell airport-select"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="search-label">{label}</span>
      <input
        className="search-input airport-select-input"
        type="text"
        placeholder="都市名・空港名"
        value={displayText}
        readOnly
      />

      {open && (
        <ul className="airport-select-list">
          {airports.length === 0 && (
            <li className="airport-select-empty">空港がありません</li>
          )}
          {airports.map(a => (
            <li
              key={a.airportCode}
              className={`airport-select-item ${a.airportCode === value ? 'selected' : ''}`}
              onClick={() => handleSelect(a.airportCode)}
            >
              <span className="airport-select-name">{a.name}</span>
              <span className="airport-select-sub">{a.city} · {a.airportCode}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
