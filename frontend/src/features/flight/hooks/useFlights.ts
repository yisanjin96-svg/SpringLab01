import { useEffect, useState } from "react";
import type { FlightResponse } from "../types";
import { fetchFlights, getFlightErrorMessage } from "../api";

// X2 表示時に航空便一覧を取得して持っておく（specs X2）
// クリーンアーキテクチャ 20章 : ユースケースに近い役割
export function useFlights(
    departureAirport: string,
    arrivalAirport: string,
    departureDate: string ) {
    // null = まだ結果が届いていない、[] = 結果0件（I001）
    const [flights, setFlights] = useState<FlightResponse[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    // URLの条件が変わったら（初回表示も含む）もう一度呼ぶ
    useEffect(() => {

        if (departureDate === '') {
            return
        }

        // 条件が変わった後に届いた古い応答は無視する
        let ignore = false

        const load = async () => {
            // 前の検索結果が残らないように空にする
            setFlights(null)
            setError(null)
            try {
                const data = await fetchFlights(departureAirport, arrivalAirport, departureDate)
                if (!ignore) {
                    setFlights(data)
                }
            } catch (e) {
                if (!ignore) {
                    setError(getFlightErrorMessage(e))
                }
            }
        }
        load()

        return () => {
            ignore = true
        }
    }, [departureAirport, arrivalAirport, departureDate])

    return { flights, error }
}
