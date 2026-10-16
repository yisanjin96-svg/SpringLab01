export type AirportResponse = {
    // aiportCode : string,
    // KeyName : 値のタイプ ➝ タイプはTypeScriptがしてくれる、キー名がサーバーJSONと同じの形なのかは検知してくれない。
    airportCode : string,
    name : string,
    city : string
}

export type FlightResponse = {
    id : number,
    flightNumber : string,
    departureAirport : string,
    arrivalAirport : string,
    departureAt : string,
    arrivalAt : string,

}

export type ErrorResponse = {
    code : string,
    message : string
}