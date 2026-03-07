export interface Bet {
  id: string
  matchId: string
  placedAt: string
  pick: "HOME" | "DRAW" | "AWAY"
  odd: number
  stake: number
  status: "PENDING" | "WON" | "LOST"
  return: number | null
}