export interface Weather {
    latitude: number,
    longitude: number,
    current: Current
    daily: Daily
    daily_units: DailyUnits
}
//huidige temp/tijd
export interface Current {
    time: string
    temperature_2m: number
    weather_code: number
}
//De temperatuur van alle dagen op die tijd.
export interface Daily {
    time: Array<string>
    weather_code: Array<number>
    temperature_2m_max: Array<number>
    temperature_2m_min: Array<number>

}
//De units die worden gebruikt om de temperatuur te displayen. Kan dit met een pipe in html ipv dit?
export interface DailyUnits {
    time: string
    temperature_2m_max: string
    temperature_2m_min: string
}
