import axios from "axios";
import type { FlightResponse } from "./types";

// X1 航空便検索 : GET /api/flights?departureAirport=FUK&arrivalAirport=HND
// 出発地・到着地・出発日を送る（片道1回分の検索）
// クリーンアーキテクチャ 22章 : インターフェースアダプター
export async function fetchFlights(departureAirport: string, arrivalAirport: string, departureDate: string): Promise<FlightResponse[]> {
    const response = await axios.get<FlightResponse[]>('/api/flights', {
        params: { departureAirport, arrivalAirport, departureDate }
    })
    return response.data
}
