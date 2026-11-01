import { useEffect, useState } from "react";
import type { AirportResponse } from "../types";
import { fetchAirports } from "../api";

export function useAirports() {
    const [airports, setAirports] = useState<AirportResponse[]>([])
    const [error, setError] = useState<string|null>(null)

    useEffect(() => {
        // 画面を離れた後に届いた応答は無視する
        let ignore = false

        const load = async () => {
            try {
                const data = await fetchAirports();
                if (!ignore) {
                    setAirports(data)
                }
            } catch {
                if (!ignore) {
                    setError("空港一覧を読み込めませんでした。しばらくしてから再度お試しください。")
                }
            }
        }
        load()

        return () => {
            ignore = true
        }
    }, [])

    return {airports, error}
}
