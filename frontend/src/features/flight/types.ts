// X1 航空便検索 API のレスポンス（バックエンドの FlightResponse と同じフィールド）
// クリーンアーキテクチャ 22章 : 境界を越えるデータ
export type FlightResponse = {
    id : number,
    flightNumber : string,
    departureAirport : string,
    arrivalAirport : string,
    departureAt : string,   // LocalDateTime は JSON で文字列として届く（例: 2026-10-01T09:00:00）
    arrivalAt : string,
    // TODO: 백엔드 FlightResponse에 등급별 운임·남은 좌석이 추가되면 여기도 추가한다
    // fares : FlightFareResponse[],
}

// 座席クラス（バックエンドの Enum と同じ値）
export type SeatClass = 'ECONOMY' | 'BUSINESS'

// 便1つの座席クラス1つ分の運賃・残席
export type FlightFareResponse = {
    seatClass : SeatClass,
    amount : number,          // 大人1名の運賃（円）: flight_fare.amount
    availableSeats : number,  // 残席数 : seat.status = 'AVAILABLE' の行数
}

// X2で選んだ便と運賃（画面の中だけで持つデータ）
export type SelectedFare = {
    flightId : number,
    flightNumber : string,
    seatClass : SeatClass,
    amount : number,
}

// 共通エラーレスポンス : {"code": "ER001", "message": "..."}
export type ErrorResponse = {
    code : string,
    message : string
}
