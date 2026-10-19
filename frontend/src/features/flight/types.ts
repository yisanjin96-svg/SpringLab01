// X1 航空便検索 API のレスポンス（バックエンドの FlightResponse と同じフィールド）
// クリーンアーキテクチャ 22章 : 境界を越えるデータ
export type FlightResponse = {
    id : number,
    flightNumber : string,
    departureAirport : string,
    arrivalAirport : string,
    departureAt : string,   // LocalDateTime は JSON で文字列として届く（例: 2026-10-01T09:00:00）
    arrivalAt : string,
}

// 共通エラーレスポンス : {"code": "ER001", "message": "..."}
export type ErrorResponse = {
    code : string,
    message : string
}
