import axios from "axios";
import type { AirportResponse } from "./types";

export async function fetchAirports(): Promise<AirportResponse[]> {
    // 1) fetchAirports()が空っぽのPromise＜AirportResponse[]＞を先に返す。*先にPromiseオブジェクトを返す。
    const response = await axios.get<AirportResponse[]>('/api/airports')
    // 2) awaitで待っていて、サーバーからデータをPromiseに満たされると
    return response.data
    // 3）最終的に、Airports配列を返す。
}
