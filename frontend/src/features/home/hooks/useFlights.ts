import { useEffect, useState } from "react";
import { FlightResponse } from "../types";
import { fetchFlights } from "../api";

export function useFlight(departureAirport:string, arrivalAirport:string) {
    const [flights, setFlights] = useState<FlightResponse[]>([])
    const [error, setError] = useState<String|null>(null)

    useEffect(() => {
        const load = async () => {
            try { 
                const data = await fetchFlights(departureAirport, arrivalAirport);
                setFlights(data)
            } catch {
                setError("ErrorCode(400) : データの呼び出しが失敗しました。")
            }
        }
    load()
    }, [])
    
    return {flights, error}
}