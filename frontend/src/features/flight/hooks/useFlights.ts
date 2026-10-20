import { useEffect, useState } from "react";
import axios from "axios";
import type { FlightResponse, ErrorResponse } from "../types";
import { fetchFlights } from "../api";

// X2 表示時に航空便一覧を取得して持っておく（specs X2）
// クリーンアーキテクチャ 20章 : ユースケースに近い役割
export function useFlights(
    departureAirport: string, 
    arrivalAirport: string, 
    depatureDate: string ) {
    // null = まだ結果が届いていない、[] = 結果0件（I001）
    const [flights, setFlights] = useState<FlightResponse[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    // URLの条件が変わったら（初回表示も含む）もう一度呼ぶ
    useEffect(() => {

        if (depatureDate === '') {
            return
        }

        const load = async () => {
            // 前の検索結果が残らないように空にする
            setFlights(null)
            setError(null)
            try {
                const data = await fetchFlights(departureAirport, arrivalAirport, depatureDate)
                setFlights(data)
            } catch (e) {
                if (axios.isAxiosError<ErrorResponse>(e) && e.response) {
                    // サーバー400（ER001・ER002）: レスポンスの message をそのまま表示
                    setError(e.response.data.message)
                } else {
                    // E010 : 通信失敗
                    setError("航空便一覧を読み込めませんでした。しばらくしてから再度お試しください。")
                }
            }
        }
        load()
    }, [departureAirport, arrivalAirport, depatureDate])

    return { flights, error }
}
