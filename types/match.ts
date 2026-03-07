export interface Match {
  id: string
  startTime: string
  league: {
    id: string
    name: string
    country: string
  }
  homeTeam: {
    id: string
    name: string
  }
  awayTeam: {
    id: string
    name: string
  }
  market: {
    type: "1X2"
    odds: {
      home: number
      draw: number
      away: number
    }
  }
}