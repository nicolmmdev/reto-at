export type OddsKey = "home" | "draw" | "away"
export type Pick = Uppercase<OddsKey>

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
    shortName?: string
  }

  awayTeam: {
    id: string
    name: string
    shortName?: string
  }

  market: {
    type: string
    odds: Record<OddsKey, number>
  }
}