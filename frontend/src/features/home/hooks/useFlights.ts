import { useState } from "react";
import { FlightResponse, ErrorResponse} from "../types";
import { fetchFlights } from "../api";
import axios from "axios";

export function useFlights() {
    const [flights, setFlights] = useState<FlightResponse[] | null>(null)
    const [error, setError] = useState<string|null>(null)

    const search = async (depatureAirport : string, arrivalAirport : string) => {
        // 検索結果をNullにしないと、事前のデータが残っているので、
        setFlights(null)
        setError(null)
        
        try{
            const data = await fetchFlights(depatureAirport, arrivalAirport)
            setFlights(data)
        } catch(e) {
            if (axios.isAxiosError<ErrorResponse> (e) && e.response) {
                setError(e.response.data.message)
            } else {
                setError("通信に失敗しました。")
            }
        }
    }
    return { flights, error, search }
}