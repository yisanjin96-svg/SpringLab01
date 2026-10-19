import axios from "axios";
import type { FlightResponse } from "./types";

// X1 航空便検索 : GET /api/flights?departureAirport=FUK&arrivalAirport=HND
// 第1段階は出発地・到着地のみ送る（specs X1）
// クリーンアーキテクチャ 22章 : インターフェースアダプター
export async function fetchFlights(departureAirport: string, arrivalAirport: string): Promise<FlightResponse[]> {
    const response = await axios.get<FlightResponse[]>('/api/flights', {
        params: { departureAirport, arrivalAirport }
    })
    return response.data
}
