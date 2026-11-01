import type { FlightFareResponse, SeatClass, SelectedFare } from "./types";

// クリーンアーキテクチャ 20章 : 運賃・残席の業務ルールを画面部品から分けて1か所に置く

// 座席クラスの表示名
export const SEAT_CLASS_LABEL: Record<SeatClass, string> = {
    ECONOMY: '普通席',
    BUSINESS: 'ビジネス',
}

// 12000 ➝ 「¥12,000」
export function formatYen(amount: number) {
    return `¥${amount.toLocaleString('ja-JP')}`
}

// 残席数 ➝ 画面の表示
// TODO: 「残りわずか」의 기준(지금은 5석 이하)을 기능 정의에서 정한다
export function seatStatusLabel(availableSeats: number) {
    if (availableSeats === 0) {
        return '満席'
    }
    return availableSeats <= 5 ? `残り${availableSeats}席` : '○'
}

// 合計金額 = (往路運賃 + 復路運賃) × 大人の人数
// TODO: 유아(infants) 운임 규칙을 정해서 합계에 반영한다 (지금은 대인 인원수만 곱함)
export function calculateTotal(outbound: SelectedFare | null, inbound: SelectedFare | null, adults: number) {
    return ((outbound?.amount ?? 0) + (inbound?.amount ?? 0)) * adults
}

// URLの adults を人数に変換する。1〜9の整数でなければ1名とする（X1の入力範囲と同じ）
export function parseAdults(value: string | null) {
    const adults = Number(value)
    return Number.isInteger(adults) && adults >= 1 && adults <= 9 ? adults : 1
}

// TODO: 백엔드가 fares를 내려주면 이 더미 함수를 지우고, X2_FlightTable에서 f.fares를 쓴다
// 仮データ : 偶数IDの便はビジネスを満席にして、満席の表示も確認できるようにしている
export function getDummyFares(flightId: number): FlightFareResponse[] {
    return [
        { seatClass: 'ECONOMY', amount: 12000, availableSeats: 30 },
        { seatClass: 'BUSINESS', amount: 28000, availableSeats: flightId % 2 === 0 ? 0 : 3 },
    ]
}
