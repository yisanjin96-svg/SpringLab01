import { useEffect, useState } from "react";
import { AirportResponse } from "../types";
import { fetchAirports } from "../api";

export function useAirports() {
    const [airports, setAirports] = useState<AirportResponse[]>([])
    const [error, setError] = useState<String|null>(null)

    useEffect(() => {
        const load = async () => {
            try { 
                const data = await fetchAirports();
                setAirports(data)
            } catch {
                setError("ErrorCode(400) : データの呼び出しが失敗しました。")
            }
        }
    load()
    }, [])
    
    return {airports, error}
}