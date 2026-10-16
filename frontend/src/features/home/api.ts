import axios from "axios";
import type { AirportResponse, FlightResponse } from "./types";

export async function fetchAirports(): Promise<AirportResponse[]> {
    // 1) fetchAirports()が空っぽのPromise＜AirportResponse[]＞を先に返す。*先にPromiseオブジェクトを返す。
    const response = await axios.get<AirportResponse[]>('/api/airports')
    // 2) awaitで待っていて、サーバーからデータをPromiseに満たされると
    return response.data
    // 3）最終的に、Airports配列を返す。
}

// X1 航空便検索 : GET /api/flights?departureAirport=FUK&arrivalAirport=HND
// 第1段階は出発地・到着地のみ送る（specs X1）
export async function fetchFlights(departureAirport: string, arrivalAirport: string): Promise<FlightResponse[]> {
    const response = await axios.get<FlightResponse[]>('/api/flights', {
        params: { departureAirport, arrivalAirport }
    })
    return response.data
}

